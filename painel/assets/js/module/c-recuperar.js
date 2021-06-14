import superApp from '../library/superApp.js'
import cache from '../library/cache.js'
const App = new superApp
export default {
    template: "#recuperar_senha",
    data: function () {
        return {
            App,
            cache,
            email: '',
            message: false
        }
    },
    methods: {
        async recuperar_senha() {
            let res = await this.App.recuperar_senha( this.email )
            console.log( res )
            this.message = true
        }
    },
    mounted() {
        this.email = this.cache.email
    }
}