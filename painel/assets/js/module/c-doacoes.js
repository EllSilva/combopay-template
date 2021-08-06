import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App

export default {
    template: "#c-doacoes",
    data: function () {
        return {
            cache,
            Super,
            doacoes: []
        }
    },
    filters: {
        is_price(price) {
            let valor = price.toLocaleString('pt-br', { minimumFractionDigits: 2 })
            return `R$${valor}`
        },
        format_data(data) {
            return data.substr(0, 10).split('-').reverse().join('/')
        },
        tipo(tipo) {
            if (tipo == 'boleto') return 'Boleto'
            return "Cartão"
        },
        status(status) {
            let lib = {
                waiting_payment: 'Pendente',
                refused: 'Cancelado'
            }
            return lib[status] || 'Pendente'
        }
    },
    async mounted() {
        let res = await this.Super.all_doacao_by_institution(this.cache.institution)
        this.doacoes = res
        console.log(res)
    }
}
