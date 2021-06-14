import menus from '../data/menu.js'
import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-credenciais-novo",
    data: function () {
        return {
            Super,
            menus: menus,
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
    methods: {
        async adicionar() {
            let is_checks = Object.keys(this.checks).filter( key => this.checks[key] == true  ).join(',')
            let res = await this.Super.post_credential({
                nome: this.title,
                recursos: is_checks
            })
            if( res.status == 'success' ) {
                window.location.href = "#/credenciais"
            }
        }
    }
}


