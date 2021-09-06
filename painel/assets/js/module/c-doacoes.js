import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App

export default {
    template: "#c-doacoes",
    data: function () {
        return {
            cache,
            Super,
            link: '',
            backup: [],
            doacoes: [],
            ids: [],

            periodo: Date.now(),
            data_min: null,
            data_max: null,
            status: 1,
            tipo: 1,
            s: '',
        }
    },
    filters: {
        is_price:  val => (val/100).toLocaleString('pt-br', { minimumFractionDigits: 2 }),        
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
                refused: 'Cancelado',
                paid: 'Pago'
            }
            return lib[status] || 'Pendente'
        }
    },
    methods: {
        render() {
            // %0A
            let link = 'data:text/csv;charset=utf-8,'
            this.doacoes = this.backup.filter(dc => {
                
                let corruent_data = Date.parse(dc.updated_at)
                let tipo = this.tipo == 1 ? true : this.tipo == dc.tipo
                let status = this.status == 1 ? true : this.status == dc.status
                let periodo = this.periodo == 1 ? true : dc.corruent_data >= this.periodo
                return tipo && status 
            })

            link += this.doacoes.map( dc => Object.values(dc).join(';')+'%0A' )
            this.link = link

        },

    },
    watch: {
        s(newQuestion, oldQuestion) { this.render() },
        periodo(newQuestion, oldQuestion) { this.render() },
        data_min(newQuestion, oldQuestion) { this.render() },
        data_max(newQuestion, oldQuestion) { this.render() },
        status(newQuestion, oldQuestion) { this.render() },
        tipo(newQuestion, oldQuestion) { this.render() },
    },
    async mounted() {
        let res = (await this.Super.all_doacao_by_institution(this.cache.institution)).reverse()
        this.doacoes = res
        globalThis._doacoes = res
        this.backup = res
    }
}


