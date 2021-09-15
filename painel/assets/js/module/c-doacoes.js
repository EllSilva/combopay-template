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

            periodo: 0,
            data_min: null,
            data_max: null,
            status: 1,
            tipo: 1,
            s: '',
        }
    },
    filters: {
        is_price: val => (val / 100).toLocaleString('pt-br', { minimumFractionDigits: 2 }),
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
            link += this.doacoes.map(dc => Object.values(dc).join(';') + '%0A')
            this.link = link

        },
        select_data() {
            var render_days = new Date(new Date().getTime() - (this.periodo * 24 * 60 * 60 * 1000));
            this.doacoes = this.backup.filter(doador => doador.filter_data >= render_days.getTime())

        },
        de() {
            let data_min = Date.parse(this.data_min)
            this.doacoes = this.backup.filter(doador => doador.filter_data >= data_min)
        },
        ate() {
            let data_min = Date.parse(this.data_min)
            let data_max = Date.parse(this.data_max)
            this.doacoes = this.backup.filter(doador => doador.filter_data >= data_min && doador.filter_data <= data_max)
        },
        search() {
            console.log(this.s)
            this.doacoes = this.backup.filter(doador => {
                let termo = "@@"
                termo += doador.cpf
                termo += doador.email
                termo += doador.nome
                termo += doador.sobrenome
                return termo.indexOf(this.s) > 1
            })
            if (this.s.length == 0) {
                this.doacoes = this.backup
            }
        },

    },
    watch: {
        s(newQuestion, oldQuestion) { this.render() },
        // periodo(newQuestion, oldQuestion) { this.render() },
        // data_min(newQuestion, oldQuestion) { this.render() },
        // data_max(newQuestion, oldQuestion) { this.render() },
        status(newQuestion, oldQuestion) { this.render() },
        tipo(newQuestion, oldQuestion) { this.render() },
    },
    async mounted() {
        let res = (await this.Super.all_doacao_by_institution(this.cache.institution))
        this.doacoes = res.sort((a, b) => {
            let A = Date.parse(a.created_at)
            let B = Date.parse(b.created_at)
            if (A < B) return -1
            if (A > B) return 1
            return 0
        }).reverse()
        this.doacoes = res.map(doacao => {
            doacao.filter_data = Date.parse(doacao.created_at)
            return doacao
        })
        globalThis._doacoes = this.doacoes
        this.backup = this.doacoes
        this.render()
    }
}


