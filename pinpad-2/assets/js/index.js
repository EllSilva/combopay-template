import Vue from './library/vue.js'
const App = new Vue({
    el: '#app',
    data: {
        offset_config: -320,
        valor: '00,00',
        operacao: "credit",
        tipo_parcela: 1,
        disabled: false,
        offset_alert: -100,
        message: '',
        pinpad_messages: '',
        pinpad_error: '',
        pinpad_success: '',
        max_parcelas: [],
        configure: {
            marketplace_id: null,
            seller_id: null,
            publishable_key: null,
            serial_port_list: 'AUTO',
        },
        historico: [],
        error: {
            message: '',
            status: false
        },
        popups: "",
        transactionId: null,
    },
    watch: {
        operacao(val) {
            if (val == 1) {
                this.tipo_parcela = 1
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        valor(val) {

            let valor = val
            let parcelas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

            valor = valor.replace('.', '')
            valor = valor.replace(',', '.')
            valor = parseFloat(valor)

            parcelas = parcelas.map((item, key) => valor / (key + 1))
            parcelas = parcelas.filter(x => x >= 5)
            this.max_parcelas = parcelas.map((item, id) => ({ id: id + 1, text: id == 0 ? 'Escolha número de parcelas' : `PARCELADO ${id + 1}X` }))

            console.log(parcelas.length)
        }
    },
    methods: {
        cache() {
            this.historico.push({
                id: this.transactionId,
                valor: this.valor,
                data: Date.now()
            })
            localStorage.setItem('historico', JSON.stringify( this.historico ))            
        },
        onopen(event) {
            // console.log('websocket conectado com sucesso')
            // console.log( event )
        },
        onclose(event) {
            console.log(event)
            this.error.status = true
            this.error.message = 'conexão com websocket cancelada'
        },
        onmessage(event) {
            let data = JSON.parse(event.data)
            this.pinpad_messages = data.message
            // console.log(data)
            switch (data.message) {
                case "SOLICITE A SENHA":
                    this.popups = 'pass'
                    break;
                case "RETIRE O CARTAO":
                    // this.popups = 'remova'                    
                    break;
                case "Insira ou passe o cartão":
                    this.popups = 'insira'                    
                    break;
            }
            switch (data.mid) {
                case "endOfTransaction":
                    this.cancelar()
                    break;
                case "paymentSuccessful":
                    this.transactionId = data.id
                    this.popups = 'sucesso'
                    // this.cache()
                    break;
                case "paymentFailed":
                    this.popups = 'erro'
                    break;
                case "onStartTransaction":
                    this.popups = 'insira'
                    break;
                case "voidTransactionSuccessful":
                    this.popups = 'estornado'
                    break;
            }
        },
        onerror(event) {
            // this.error.status = true
            // this.error.message ='algo inesperado aconteceu'
            this.popups = 'wifi'
        },
        error(event) {
            // this.error.status = true
            // this.error.message ='erro ao conectar o websocket'
            this.popups = 'wifi'
        },
        start_ws() {
            try {
                globalThis.ws = new WebSocket('ws://localhost:1337')
                globalThis.ws.onopen = this.onopen
                globalThis.ws.onclose = this.onclose
                globalThis.ws.onmessage = this.onmessage
                globalThis.ws.onerror = this.onerror
            } catch (event) {
                this.error(event)
            }
        },
        valor_in_centavos: valor => valor.replace(/\D/gi, ''),
        tipo_opercacao(numero) {
            let arr = [
                "credit",
                "debit",
                "credit_with_installments",
                "voucher",
            ]
            return arr[parseInt(numero)] || "credit"
        },
        vender() {
            let playload = {
                mid: 'charge',
                marketplaceId: this.configure.marketplace_id,
                sellerId: this.configure.seller_id,
                publishableKey: this.configure.publishable_key,
                serialPort: this.configure.serial_port_list,
                paymentType: this.operacao,
                valueInCents: this.valor_in_centavos(this.valor),
                numberOfInstallments: this.tipo_parcela,
                metadata: null,
                referenceId: null,
            }
            globalThis.ws.send(JSON.stringify(playload))
        },
        estorno() {
            let playload = {
                mid: "void",
                marketplaceId: this.configure.marketplace_id,
                publishableKey: this.configure.publishable_key,
                sellerId: this.configure.seller_id,
                transactionId: this.transactionId,
                serialPort: this.configure.serial_port_list,
            }
            globalThis.ws.send(JSON.stringify(playload))
        },
        cancelar() {
            this.valor = '00,00'
            this.operacao = "credit"
            this.tipo_parcela = 1
            this.pinpad_messages = ''
        },
        config_save() {
            localStorage.setItem('PINPAD_CONFIG', JSON.stringify(this.configure))
            this.message = 'Configurações Atualizadas!'
            this.offset_alert = 20
            setTimeout(() => {
                this.offset_alert = -100
            }, 3000)
        },
        config_info() {
            return JSON.parse(localStorage.getItem('PINPAD_CONFIG') || '{}')
        },
        format_val() {
            let val = this.valor
            val = val.replace('.', '')
            val = val.replace(/\D/gi, '')
            val = val ? val : 0
            val = `${parseInt(val)}` ?? '0'
            switch (val.length) {
                case 0:
                    val = '00,00'
                    break;
                case 1:
                    val = val.replace(/(\d{1})/gi, '00,0$1')
                    break;
                case 2:
                    val = val.replace(/(\d{2})/gi, '00,$1')
                    break;
                case 3:
                    val = val.replace(/(\d{1})(\d{2})/gi, '0$1,$2')
                    break;
                case 4:
                    val = val.replace(/(\d{2})(\d{2})/gi, '$1,$2')
                    break;
                case 5:
                    val = val.replace(/(\d{3})(\d{2})/gi, '$1,$2')
                    break;
                case 6:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})/gi, '$1.$2,$3')
                    break;
                default:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})(.*)/gi, '$1.$2,$3')
                    break;
            }

            this.valor = val
        },
    

    },
    mounted() {
        this.configure = { ...this.configure, ...this.config_info() }
        this.start_ws()
        this.historico = JSON.parse( localStorage.getItem('historico') || '[]' )
    }
})

