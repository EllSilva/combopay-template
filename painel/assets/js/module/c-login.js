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
            loading: false
        }
    },
    methods: {
        async login() {
            let res = await this.App.login(this.email, this.password)
            this.loading = true
            this.cache.email = this.email
            if (res.status_code == 200) {
                this.cache.user_logged_name = res?.admin?.nome
                this.cache.user_logged_id = res?.admin?.id
                this.cache.user_logged_credential_id = res?.admin?.credencial
                this.cache.bearer = res?.token?.access_token
                let corruente_user = await this.App.get_admin(res?.admin?.id)
                this.cache.institution = corruente_user.instituicao_id
                window.location.href = "#/inicio"
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