import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-usuarios",
    data: function () {
        return {
            Super,
            loading: false,
            usuarios: []
        }
    },
    async mounted() {
        this.usuarios = (await this.Super.all_admins()).data        
    },
    methods: {
        async del( id ) {
            this.loading = true
            this.usuarios = this.usuarios.map( user => { 
                if(user.id == id) {
                    user.ativo = 0
                }
                return user                 
            })
            this.usuarios = this.usuarios.filter( user => user.ativo == 1 )
            await this.Super.status_admin( id, 0 )
            this.loading = false
        }
    }
}
