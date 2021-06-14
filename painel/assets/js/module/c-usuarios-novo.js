import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-usuarios-novo",
    data: function () {
        return {
            Super,
            cache,
            credenciais: [],
            error: null,
            id: null,
            loading: false,
            form: {
                nome: 'bruno',
                email: 'br.rafael@outlook.com',
                instituicao_id: 0,
                telefone: '82999999999',
                credencial: 1,
                password: null,
                password_confirm: null,
                ativo: 1,
                vendendor_id: 0 
            }
        }
    }, 
    methods: {
        async salvar() {
            this.loading = true
            this.error = this.validar_senha()
            console.log(this.error)         
            if( !this.error ) {
                let res = await this.Super.cadastro_admin( this.form )
                if( res.status != 'error' ) {
                    window.location.href = "#/usuarios"
                }else {
                    this.error = res.message
                }
            }
            this.loading = false
        },
        validar_senha() {
            if(this.form.password.length < 6) 
                return 'Senha deve ter 6 caracteres'
                
            if(this.form.password != this.form.password_confirm ) 
                return 'As senhas devem ser iguais'
            
            return null
                
        }
    },
    async mounted() {
        this.form.instituicao_id = this.cache.institution
        let res = await this.Super.all_credential()
        this.credenciais = res.data
    }
}



