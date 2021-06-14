import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-usuarios-novo",
    data: function () {
        return {
            Super,
            credenciais: [],
            error: null,
            id: null,
            loading: false,
            form: {
                nome: null,
                email: null,
                instituicao_id: 1,
                telefone: null,
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
            delete this.form.password
            this.loading = true
            let res = await this.Super.put_admin( this.id, this.form )
            if( res.status == 'success' ) {
                window.location.href = "#/usuarios"
            } else {
                this.error = res.message
            }
            this.loading = false

        }
    },
    async mounted() {
        this.id = this.$route.params.id
        let res = await this.Super.all_credential()
        let user = await this.Super.get_admin(this.id )
        Object.keys(user).forEach(key => {
            this.form[key] = user[key]
        });
        this.credenciais = res.data
    }
}


