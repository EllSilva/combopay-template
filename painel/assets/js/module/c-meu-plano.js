import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-meu-plano",
    data: function () {
        return {
            Super,
            cache,
            user: null,
            loading: false,
            credencial: 0,
            plano_id: "1386061",
            plano_id_zap: 0,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            },
            plano_whatsapp: [
                { id: 0, preco: "R$ 00,00", text: "Nenhum disparo"},
                { id: 1, preco: "R$ 69,90", text: "1 mil disparos por mês"},
                { id: 2, preco: "R$ 110,00", text: "2 mil disparos por mês"},
                { id: 5, preco: "R$ 190,00", text: "5 mil disparos por mês"}
            ],
            planos: [
                { preco: 29.90  , id: "1386061", instancias: 1 },
                { preco: 56.81 , id: "1396159", instancias: 2 },
                { preco: 80.73,  id: "1386052", instancias: 3 },
                { preco: 152.49, id: "1386056", instancias: 6 },
                { preco: 220.66, id: "1386057", instancias: 9 },
                { preco: 279.86, id: "1386058", instancias: 12 },
                { preco: 336.37, id: "1386059", instancias: 15 },
            ],
            lista_whats: {
                11: { preco: 99.80, id: "1430707", instancias: 1 },
                21: { preco: 139.90, id: "1430709", instancias: 1 },
                51: { preco: 219.90, id: "1430711", instancias: 1 },
                12: { preco: 126.71, id: "1430718", instancias: 2 },
                22: { preco: 166.81, id: "1430719", instancias: 2 },
                52: { preco: 246.81, id: "1430720", instancias: 2 },
                13: { preco: 150.63, id: "1430722", instancias: 3 },
                23: { preco: 190.73, id: "1430723", instancias: 3 },
                53: { preco: 270.73, id: "1430724", instancias: 3 },
                16: { preco: 222.39, id: "1430725", instancias: 6},
                26: { preco: 262.49, id: "1430726", instancias: 6},
                56: { preco: 342.49, id: "1430727", instancias: 6},
                19: { preco: 290.56, id: "1430729", instancias: 9},
                29: { preco: 330.66, id: "1430730", instancias: 9},
                59: { preco: 410.66, id: "1430731", instancias: 9},
                112: { preco:349.76, id: "1430732", instancias: 12 },
                212: { preco:389.86, id: "1430733", instancias: 12 },
                512: { preco:469.86, id: "1430734", instancias: 12 },
                115: { preco:406.27, id: "1430735", instancias: 15 },
                215: { preco:446.37, id: "1430736", instancias: 15 },
                515: { preco:526.37, id: "1430737", instancias: 15 },
            },
            cupon: [
                { code: "#ANJODIGITAL", trial: 30, preco: 99.80, id: "1430740", instancias: 1 },
            //    { code: "#ANJODIGITAL", trial: 30, preco: 56.81, id: "1396162", instancias: 2 },
            //    { code: "#ANJODIGITAL", trial: 30, preco: 80.73, id: "1386062", instancias: 3 },
            //    { code: "#ANJODIGITAL", trial: 30, preco: 152.49, id: "1386064", instancias: 6 },
            //    { code: "#ANJODIGITAL", trial: 30, preco: 220.66, id: "1386065", instancias: 9 },
            //    { code: "#ANJODIGITAL", trial: 30, preco: 279.86, id: "1386066", instancias: 12 },
            //    { code: "#ANJODIGITAL", trial: 30, preco: 336.37, id: "1386067", instancias: 15 },
            ],
            doacao: {
                plan_id: null,
                amount: '400',
                card: "",
                validade: "",
                cvv: "",
                nome_card: "",
                payment_type: 'card',
                cupom: ""
            },
            trial: {
                status: false,
                plan_id: null
            }
        }
    },
    watch: {
        plano_id(x, y) { this.valor() }
    },
    methods: {
        valor() {},
        cupom() {
            let code = "#ANJODIGITAL"
            if (this.doacao.cupom.replace(' ', '') == code) {
                this.trial.status = true
                this.trial.plan_id = 1
                this.trial.plan_id = this.cupon[0].id
                this.plano_id = this.planos[0].id
            } else {
                this.trial.plan_id = null
                this.trial.status = false
            }
        },
        mask_validade() {
            let mascara = this.doacao.validade
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{2})(\d{2,4})(.*)/gi, '$1/$2')
            if (mascara.length > 0) {
                this.doacao.validade = mascara
            } else {
                this.doacao.validade = "02/2020"
            }
        },
        mask_cvv() {
            let mascara = this.doacao.cvv
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{3})(.*)/gi, '$1')
            this.doacao.cvv = mascara

        },
        mask_card() {
            let mascara = this.doacao.card
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{4})(.*)/gi, '$1 $2')
            mascara = mascara.replace(/(\d{4}\s)(\d{4})(.*)/gi, '$1$2 $3')
            mascara = mascara.replace(/(\d{4}\s)(\d{4}\s)(\d{4})(.*)/gi, '$1$2$3 $4')
            mascara = mascara.replace(/(\d{4}\s)(\d{4}\s)(\d{4}\s)(\d{4})(.*)/gi, '$1$2$3$4')
            this.doacao.card = mascara
        },
        async contratar_plano() {

            this.loading = true

            let valor = this.planos.find(p => p.id == this.plano_id).preco.toFixed(2).toString().replace('.', '')
            let instacia_total = this.planos.find(p => p.id == this.plano_id).instancias

            let playload = {
                doador_id: "",
                metodo: "credit_card",
                instituicao_id: 1,
                // instituicao_id: 're_ckq9yr3cf1ign0h9t8bi414jh',
                plano_id:this.plano_id_zap != 0 ? this.lista_whats[`${this.plano_id_zap}${plano.instancias}`].id : this.plano_id,
                // plano_id: this.plano_id,
                // plano_id: 614822,
                quantia: valor,
                valor_plano: valor,
                cliente: {
                    nome: this.user.nome,
                    cpf: this.user.cpf.replace(/\D/ig, ''),
                    email: this.user.email,
                    dataNascimento: this.user.dataNascimento,
                    sexo: "masculino",
                    telefone: this.user.telefone.replace(/\D/ig, '').substr(2, 10),
                    ddd: this.user.telefone.replace(/\D/ig, '').substr(0, 2),
                },
                endereco: {
                    cep: this.user.cep,
                    rua: this.user.rua,
                    numero: this.user.numero,
                    bairro: this.user.bairro,
                    complemento: this.user.complemento,
                    cidade: this.user.cidade,
                    estado: this.user.estado,
                },
                cartao_credito: {
                    nome: this.doacao.nome_card,
                    cvv: this.doacao.cvv.replace(/\D/ig, ''),
                    numero: this.doacao.card.replace(/\D/ig, ''),
                    expiracao: this.doacao.validade.replace(/\D/ig, ''),
                }
            }   
            
            // Aqui gente verifica se esta no plano
            if( this.doacao.cupom == "#ANJODIGITAL" ) {
                playload.plano_id = 1422606
                playload.quantia = 4.0
                playload.valor_plano = 4.0
            }

            let res = await this.Super.payPlan(playload)
            this.loading = false

            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status

            if( res.status != "success" ) {                
                return
            }

            if( this.user?.credencial == 21 ) {
                window.location.href = '#/minhas-instituicoes/1'
                localStorage.setItem('user_logged_credential_id', 16)
                await this.Super.put_admin(this.user.id, {
                    credencial: 16
                }) 
            } 

        },
        total() {
            let plano = this.planos.find( p => p.id == this.plano_id)
            if(this.plano_id_zap != 0) return this.lista_whats[`${this.plano_id_zap}${plano.instancias}`].preco
            return plano.preco
        }
    },
    filters: {
        money: val => val.toLocaleString('en-US', { style: 'currency', currency: 'BRL', }),
    },
    async created() {
        this.credencial = localStorage.getItem('user_logged_credential_id')
        this.user = await this.Super.get_admin(this.cache.user_logged_id)

    }
}

