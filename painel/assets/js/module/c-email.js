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
            title: 'Configurar E-mail',
            flag: 'PHP_MAILER',
            loading: false,
            is_flag: false,
            id: null,
            user: {
                credencial: null
            },
            autoForm: [
                { label: 'Host SMTP', name: 'host_smtp' },
                { label: 'Porta', name: 'port' },
                { label: 'E-mail', name: 'email' },
                { label: 'Senha', name: 'senha' },
                { label: 'Nome', name: 'name' },
            ],
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            },
        }
    },
    async mounted() {
        this.user = await this.Super.get_admin(this.cache.user_logged_id)
        this.load()

    },
    methods: {
        async create_flag() {
            let playload = {
                base64: btoa(JSON.stringify({})),
                flag: this.flag,
                instituicao_id: this.cache.institution
            }
            return await this.Super.flag_post(playload)
        },
        async load() {
            let all_flags = await this.Super.flag_get_by_institution(this.cache.institution)
            let flag = all_flags.find(post => post.flag == this.flag)
            if (flag) {
                this.id = flag.id
                this.form = JSON.parse(atob(flag.base64))
            } else {
                this.is_flag = true
            }

        },
        async save() {
            this.loading = true
            let playload = {
                base64: btoa(JSON.stringify(this.form)),
                flag: this.flag,
                instituicao_id: this.cache.institution
            }
            let res = await this.Super.flag_put(this.id, playload)
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false

        },
        async pular() {
            localStorage.setItem('user_logged_credential_id', 19)
            await this.Super.put_admin(this.user.id, {
                credencial: 19
            }) 
            window.location.href = '#/modelo-de-emails'            
        }
    }
}