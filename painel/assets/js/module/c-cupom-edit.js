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
                name: null,
                discout: null,
                code: null,
            },
            title: 'Editar Cupom',
            flag: 'CUPOM',
            loading: false,
            id: null,
            is_flag: false,
            playload: [],
            is_id: null,
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
            let flag = all_flags.reverse().find(post => post.flag == this.flag)
            this.playload = JSON.parse(atob(flag.base64))
            this.is_id = this.$route.params.id
            if (flag) {
                this.id = flag.id
                let is = this.playload.find(post => post.id == this.$route.params.id)
                this.form.name = is.name
                this.form.discout = is.discout
                this.form.code = is.code
            } else {
                this.is_flag = true
            }
            this.form.id = this.$route.params.id
            this.form.ativo = true
        },
        async save() {
            this.loading = true
            this.playload = this.playload.map(post => {
                if (post.id == this.$route.params.id) {
                    post = this.form
                }
                return post
            })
            let playload = {
                base64: btoa(JSON.stringify(Array.from(this.playload))),
                flag: this.flag,
                instituicao_id: this.cache.institution
            }
            let res = await this.Super.flag_put(this.id, playload)
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            window.location.href = "#/cupons"
            this.loading = false
        }
    }
}