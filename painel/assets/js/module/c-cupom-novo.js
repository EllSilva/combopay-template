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
            title: 'Cupom Novo',
            flag: 'CUPOM',
            loading: false,
            id: null,
            is_flag: false,
            playload: [],
            autoForm: [
                { label: 'Nome', name: 'name' },
                { label: 'Código Personalizado', name: 'code' },
                { label: 'Disconto', name: 'discout' },
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
            let flag = all_flags.find(post => post.flag == this.flag)
            this.playload = JSON.parse( atob( flag.base64 ) )
            if (!flag)  this.is_flag = true
            this.form.id = Date.now()
            console.log( this.form )

        },
        async save() {
            this.loading = true
            let playload = {
                base64: btoa(JSON.stringify( this.playload.push( this.form ))),
                flag: this.flag,
                instituicao_id: this.cache.institution
            }
            let res = await this.Super.flag_put(this.id, playload)
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false

        }
    }
}