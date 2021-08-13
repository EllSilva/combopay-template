import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-meu-plano",
    data: function () {
        return {
            Super,
            cache,
            id: null,
            nome: null,
            email: null,
            telefone: null,
            senha: '',
            print_valor: "29.90",
            plano_id: "1386032",
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
            },
            planos: [
                { preco: "29.90", id: "1386032", instancias: 1 },
                { preco: "80.73", id: "1386052", instancias: 3 },
                { preco: "15.249", id: "1386056", instancias: 6 },
                { preco: "220.66", id: "1386057", instancias: 9 },
                { preco: "279.86", id: "1386058", instancias: 12 },
                { preco: "336.37", id: "1386059", instancias: 15 },
            ],
            cupon: [
                { code: "#ANJODIGITAL", trial: 30, preco: "29.90", id: "1386061", instancias: 1 },
                { code: "#ANJODIGITAL", trial: 30, preco: "80.73", id: "1386062", instancias: 3 },
                { code: "#ANJODIGITAL", trial: 30, preco: "152.49", id: "1386064", instancias: 6 },
                { code: "#ANJODIGITAL", trial: 30, preco: "220.66", id: "1386065", instancias: 9 },
                { code: "#ANJODIGITAL", trial: 30, preco: "279.86", id: "1386066", instancias: 12 },
                { code: "#ANJODIGITAL", trial: 30, preco: "336.37", id: "1386067", instancias: 15 },
            ],
        }
    },
    watch: {
        plano_id(x, y ) { this.valor() }
    },
    methods: {
        valor() {
            this.plano_id
            console.log('ok')
        },
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
    filters: {
        money: val => parseInt( val ).toLocaleString('en-US', { style: 'currency', currency: 'BRL', }),        

    },
    async created() {
        
        let res = await this.Super.get_admin(this.cache.user_logged_id)
        this.id = res.id
        this.nome = res.nome
        this.email = res.email
        this.telefone = res.telefone


    }
}

