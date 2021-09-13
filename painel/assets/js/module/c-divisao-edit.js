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
                id: null,
                responsavel: null,
                porcetagem: null,
                instituicao_id: null,
                restos_taxas: 1
            },
            title: 'Editar Divisão',
            flag: 'DIVISAO',
            loading: false,
            id: null,
            is_flag: false,
            playload: [],
            is_id: null,
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
            let split = await this.Super.split_get(this.$route.params.id)
            this.form.instituicao_id = this.cache.institution
            this.form.porcetagem = split.porcetagem
            this.form.responsavel = split.responsavel
            this.form.id = split.id
        },
        async save() {
            this.loading = true
            let res = await this.Super.split_put(this.$route.params.id, this.form)
            window.location.href = "#/divisao-pagamento"
            this.loading = false
        }
    }
}