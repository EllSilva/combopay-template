import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App

export default {
    template: "#c-aside",
    data: function () {
        return {
            cache,
            Super,
            user: {
                nome: null
            },
        }
    },
    methods: {
        gol(stattus){
            console.log('golll')
        }
    },
    async mounted() {
        this.user = await this.Super.get_admin(this.cache.user_logged_id)
    }
}