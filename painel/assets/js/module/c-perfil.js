import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-perfil",
    data: function () {
        return {
            Super,
            cache,
            id: null,
            nome: null,
            email: null,
            telefone: null,
            senha: '',
            confirmar_senha: '',
            messageAlterPass: {
                status: false,
                text: null
            },
            loading: false,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            },
            error2: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    methods: {
        async alterar_senha() {
            this.loading = true
            this.messageAlterPass.status = false
            if (this.senha != this.confirmar_senha) {
                this.messageAlterPass.status = true
                this.messageAlterPass.text = 'As senhão estão diferentes'
                this.loading = false
                return
            }
            if (this.senha.length < 6) {
                this.messageAlterPass.status = true
                this.messageAlterPass.text = 'A senha deve ter no minimo 6 caracteres'
                this.loading = false
                return
            }
            let res = await this.Super.alterar_senha(this.id, this.senha)
            this.error2.status = true
            this.error2.text = res.message
            this.error2.type = res.status
            this.loading = false
        },
        async atualizar() {
            this.loading = true
            let res = await this.Super.put_admin(this.id, {
                email: this.email,
                telefone: this.telefone,
                nome: this.nome
            })
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false
        },
    },
    async created() {
        
        let res = await this.Super.get_admin(this.cache.user_logged_id)
        this.id = res.id
        this.nome = res.nome
        this.email = res.email
        this.telefone = res.telefone


    }
}

