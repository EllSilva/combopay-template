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
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        this.id = this.$route.params.id
        this.institution_id = '6cf4bb1e78c6428786fc8fe6ddada3a6'
        // this.institution_id = this.cache.institution
        let res = await this.Super.plano_get( this.id )
        this.form = { ...this.form, ...res }
    },
    methods: {

        async save() {
            this.loading = true
            let res = await this.Super.plano_put(this.id, this.form )
            window.location.href = '#/planos'
            this.error.status = true
            this.error.text = res?.message
            this.error.type = res?.status
            this.loading = false
        }
    }
}