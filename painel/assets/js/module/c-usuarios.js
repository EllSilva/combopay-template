import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-usuarios",
    data: function () {
        return {
            Super,
            usuarios: []
        }
    },
    async mounted() {
        this.usuarios = (await this.Super.all_admins()).data
        // console.log(res)
    },
    methods: {
        del( id ) {
            console.log( id )
            this.Super.status_admin( id, 0 )
        }
    }
}
