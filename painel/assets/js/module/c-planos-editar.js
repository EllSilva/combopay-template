import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App

export default {
    template: "#c-planos-novo",
    data: function () {
        return {
            Super,
            cache,
            id: null,
            instituicao_id: null,
            form: {
                name: null,
                frequency: "daily",
                interval: null,
                duration: null,
                currency: "BRL",
                description: null,
                amount: null,
                instituicao_id: "6cf4bb1e78c6428786fc8fe6ddada3a6"
            },
            frequency: [
                { id: "daily", label: "Diaria" },
                { id: "monthly", label: "Mensal" },
                { id: "weekly", label: "Semestral" },
                { id: "anualy", label: "Anual" },
            ],
            loading: false,
            edit: true,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        this.id = this.$route.params.id
        this.form.instituicao_id = this.cache.institution
        let res = await this.Super.plano_get(this.id)
        this.form.nome = res.name
        this.form.amount = (res.amount/100).toLocaleString('pt-br', { minimumFractionDigits: 2 }) 
    },
    methods: {
        masc_money() {
            let valor = this.form.amount.replace(/\D/gi, '')
            valor = (valor/100).toLocaleString('pt-br', { minimumFractionDigits: 2 })
            this.form.amount = valor
        },
        async save() {
            this.loading = true
            let playload = {
                nome: this.form.nome,
                instituicao_id: this.form.instituicao_id
            }
            let res = await this.Super.plano_put(this.id, playload)
            window.location.href = '#/planos'
            this.error.status = true
            this.error.text = res?.message
            this.error.type = res?.status
            this.loading = false
        }
    }
}