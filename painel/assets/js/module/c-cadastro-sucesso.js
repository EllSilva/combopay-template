import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App

export default {
    template: `
        <div>aguarde...</div>`,
    data: function () {
        return {
            cache,
            Super,
        }
    },
    async mounted() {
        let res = await this.Super.get_admin(this.$route.params.user_id)
        this.cache.user_logged_name = this.$route.params.name
        this.cache.user_logged_id = this.$route.params.user_id
        this.cache.user_logged_credential_id = 15
        this.cache.bearer = this.$route.params.token
        this.cache.institution = 0
        this.cache.email = res.email
        window.location.href = "#/meu-plano"
    },
    methods: {
        
    }
}