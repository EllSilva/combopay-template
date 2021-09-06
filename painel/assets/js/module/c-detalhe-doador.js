import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-detalhe-doador",
    data: function () {
        return {
            Super,
            cache,
            id: null,
            cep: null,
            rua: null,
            numero: null,
            bairro: null,
            complemento: null,
            cidade: null,
            estado: null,
            codigo_zoop: null,
            cpf: null,
            email: null,
            nome: null,
            sobrenome: null,
            telefone: null,
            history: []

        }
    },
    filters: {
        money: valor => 'R$' + (valor/100).toLocaleString('pt-br', { minimumFractionDigits: 2 }),
        data: horario => {
            
            let data2 = horario.substr(0,10).split('-').reverse().join('/')
            let hora = horario.substr(11,5)
            return data2 + ' - ' + hora
        },
        traduz: termo => {
            let lib = {
                waiting_payment: "Pendente",
                refused: "Cancelado",
                paid: "pago"
            }
            return lib[termo] || "Pendente"
        }
        // 2021-07-26T19:00:03.000000Z
    },
    methods: {},
    async mounted() {
        this.id = this.$route.params.id
        if (!globalThis._doadores) {
            globalThis._doadores = await this.Super.all_doadores_by_istitution(this.cache.institution)
        }
        
        globalThis._doadores = Object.values(globalThis._doadores)
        let doador = globalThis._doadores.find(doador => doador.id == this.id)
        this.cep = doador.cep
        this.rua = doador.rua
        this.numero = doador.numero
        this.bairro = doador.bairro
        this.complemento = doador.complemento
        this.cidade = doador.cidade
        this.estado = doador.estado
        this.codigo_zoop = doador.codigo_zoop
        this.cpf = doador.cpf
        this.email = doador.email
        this.nome = doador.nome
        this.sobrenome = doador.sobrenome
        this.telefone = doador.telefone

        let history = await this.Super.get_doador_history(this.id)
        console.log(history)
        history = history.map(i => {
            let lib = {
                waiting_payment: `linear-gradient(#ffff00,#ffff00)`,
                refused: `linear-gradient(#ff0000,#ff0000)`,
                paid: `linear-gradient(#00ff00,#00ff00)`
            }
            i.cor = lib[i.status] 
            return i
        })
        this.history = history
        console.log(history)

    }
}

