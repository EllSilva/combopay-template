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
            user: { credencial: null },
            form: {
                responsavel: null,
                porcetagem: null,
                instituicao_id: null,
                restos_taxas: 1
            },
            title: 'Divisão',
            flag: 'DIVISAO',
            loading: false,
            id: null,
            is_flag: false,
            playload: [],
            autoForm: [
                { label: 'Código Instituição', name: 'responsavel' },
                { label: 'Porcentagem', name: 'porcetagem' },
            ],
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
            this.form.instituicao_id = this.cache.institution
        },
        async save() {
            this.loading = true
            await this.Super.split_post(this.form)
            window.location.href = "#/divisao-pagamento"
            this.loading = false
        }
    }
}