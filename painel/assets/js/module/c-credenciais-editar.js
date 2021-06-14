import menus from '../data/menu.js'
import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-credenciais-novo",
    data: function () {
        return {
            Super,
            menus: menus,
            id: null,
            title: null,
            checks: {
                inicio: null,
                doadores: null,
                doacoes: null,
                credenciais: null,
                usuarios: null,
                instituicoes: null,
                planos: null,
                metas: null,
                modulos: null,
                estilo: null,
                modelo_de_emails: null,
                politica_de_privacidade: null,
                configuracao: null,
                perfil: null,
                script: null,
            }
        }
    }, 
    filters: {
        get_name_by_id( id ) {
            
            let permissao = menus.find( post => post.id == id )
            return permissao.text
        }
    },
    async mounted() {
        this.id = this.$route.params.id
        let res = await this.Super.get_credential( this.id  )
        this.title = res.nome
        res.recursos.split(',').forEach( id => {
            this.checks[id] = true
        });
    },
    methods: {
        async adicionar() {
            let is_checks = Object.keys(this.checks).filter( key => this.checks[key] == true  ).join(',')
            let res = await this.Super.put_credential( this.id, {
                nome: this.title,
                recursos: is_checks
            })
            if( res.status == 'success' ) {
                window.location.href = "#/credenciais"
            }
        }
    }
}


