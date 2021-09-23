import superApp from '../library/superApp.js'
import cache from '../library/cache.js'
const App = new superApp
export default {
    template: "#login",
    data: function () {
        return {
            App,
            cache,
            email: '',
            password: '',
            message_error: false,
            loading: false,
            redirect: {
                15:"#/perfil",
                21:"#/meu-plano",
                16:"#/minhas-instituicoes",
                17:"#/planos",
                18:"#/email",
                19:"#/modelo-de-emails",
            }
        }
    },
    methods: {
        async login() {
            let res = await this.App.login(this.email, this.password)
            let minha_instituicao = await this.App.all_email_admin_institution(this.email)
            this.loading = true
            this.cache.email = this.email
            if (res.status_code == 200) {
                this.cache.user_logged_name = res?.admin?.nome
                this.cache.user_logged_id = res?.admin?.id
                this.cache.user_logged_credential_id = res?.admin?.credencial
                this.cache.bearer = res?.token?.access_token
                let corruente_user = await this.App.get_admin(res?.admin?.id)
                this.cache.institution = minha_instituicao.id
                let credencial = res?.admin?.credencial
                if( credencial < 22 && credencial != 20 && credencial != 1 ) {
                    window.location.href = this.redirect[credencial]
                }else {
                    window.location.href = "#/inicio"
                }
            } else {
                this.message_error = true
            }
            this.loading = false
        }
    },
    mounted() {
        this.email = this.cache.email
    }
}