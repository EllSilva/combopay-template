import menus from '../data/menu.js'
import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-credenciais",
    data: function () {
        return {
            Super,
            credenciais: [],
            menus: menus
        }
    }, 
    filters: {
        get_name_by_id( id ) {
            let permissao = menus.find( post => post.id == id )
            return permissao?.text 
        }
    },
    async mounted() {
        let res = await this.Super.all_credential()
        this.credenciais = res?.data || []
    },
    methods: {
        async apagar( id ) {
            this.Super.put_credential( id, { ativo: false } )
        }
    }
}