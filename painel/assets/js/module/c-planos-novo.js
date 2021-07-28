import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App

export default {
    template: "#c-planos-novo",
    data: function () {
        return {
            Super,
            cache,
            form: {
                nome: null,
                frequency: "daily",
                interval: null,
                duration: null,
                currency: "BRL",
                description: null,
                amount: null,
                instituicao_id: null
            },
            frequency: [
                { id: "daily", label: "Diaria" },
                { id: "monthly", label: "Mensal" },
                { id: "weekly", label: "Semestral" },
                { id: "anualy", label: "Anual" },
            ],
            loading: false,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        this.form.instituicao_id = this.cache.institution
    },
    methods: {
        async save() {
            let playload = {
                quantia: this.form.amount,
                prazo: 30,
                nome: this.form.nome,
                instituicao_id: this.form.instituicao_id
            }
            this.loading = true
            let res = await this.Super.plano_post(playload)
            window.location.href = '#/planos'
            this.error.status = true
            this.error.text = res?.message
            this.error.type = res?.status
            this.loading = false
        }
    }
}