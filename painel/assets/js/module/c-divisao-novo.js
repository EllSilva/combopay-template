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
            form: {},
            title: 'Divisão',
            flag: 'DIVISAO',
            loading: false,
            id: null,
            is_flag: false,
            playload: [],
            autoForm: [
                { label: 'Nome', name: 'name' },
                { label: 'ID Vendedor', name: 'id_seller' },
                { label: 'Porcentagem', name: 'porcentage' },
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
            let all_flags = await this.Super.flag_get_by_institution(this.cache.institution)
            let flag = all_flags.reverse().find(post => post.flag == this.flag)
            this.playload = JSON.parse( atob( flag.base64 ) )
            if (flag) {
                this.id = flag.id
            } else {
                this.is_flag = true
            }
            this.form.id = Date.now()
            this.form.ativo = true            
        },
        async save() {
            this.loading = true
            this.playload.push( this.form )
            let playload = {
                base64: btoa(JSON.stringify( Array.from( this.playload ))),
                flag: this.flag,
                instituicao_id: this.cache.institution
            }
            let res = await this.Super.flag_put(this.id, playload)
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            window.location.href = "#/divisao-pagamento"
            this.loading = false

        }
    }
}