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
                recebedor_id: null,
                responsavel: 0,
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
                { label: 'Recebedor ID', name: 'recebedor_id' },
                { label: 'Porcentagem', type: "number", name: 'porcetagem' },
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
            this.form.recebedor_id = split.recebedor_id
            this.form.id = split.id
        },
        async save() {
            this.loading = true
            if(this.form.porcetagem < 10) {
                this.form.responsavel = 1
            }
            let res = await this.Super.split_put(this.$route.params.id, this.form)
            window.location.href = "#/divisao-pagamento"
            this.loading = false
        }
    }
}