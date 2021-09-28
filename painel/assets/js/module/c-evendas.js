import App from '../library/superApp.js'
import cache from '../library/cache.js'
import Domain from '../library/Domain.js'

const Super = new App
export default {
    template: "#c-edit-modulo",
    data: function () {
        return {
            Super,
            cache,
            Domain,
            form: {
                channel: null
            },
            title: 'E-vendas',
            flag: 'E_VENDAS',
            loading: false,
            is_flag: false,
            id: null,
            autoForm: [
                { label: 'Chave', name: 'channel' },
            ],
            user: {
                credencial: null
            },
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            },
        }
    },
    async mounted() {
        this.load()
    },
    methods: {
        async load() {
            let res = await this.Super.get_evendas(this.cache.institution)
            this.form.channel = res.identificacao_id
        },
        async save() {
            let payload = {
                instituicao_id: this.cache.institution,
                identificacao_id: this.form.channel
            }
            this.loading = true
            let res = await this.Super.save_evendas(payload)
            this.loading = false
            this.error.status = res.next
            this.error.text = res.message
            this.error.type =  res.next ? "success" : "error"

        }
    }
}