import itens from '../data/menu.js'
import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-menu",
    data: function() {
        return {
            cache,
            Super,
            itens,
            lista: [],
            active_path: null
        }
    },
    methods: {
        sair() {
            let cache = [
                'user_logged_name',
                'user_logged_id',
                'user_logged_credential_id',
                'bearer',
            ]
            cache.forEach( name => {
                localStorage.removeItem( name )
            } )
        }
    },
    async mounted() {
        let credencial = await this.Super.get_credential( this.cache.user_logged_credential_id )
        let recursos = credencial.recursos.split(',')
        this.lista = this.itens.filter( item => recursos.includes( item.id ) )
        this.active_path = `#${this.$router.currentRoute.fullPath}`
    }
}