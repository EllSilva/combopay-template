import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App

export default {
    template: "#c-planos-novo",
    data: function () {
        return {
            Super,
            cache,
            user: null,
            inst: null,
            form: {
                nome: null,
                frequency: "daily",
                interval: null,
                duration: null,
                currency: "BRL",
                description: null,
                amount: null,
                instituicao_id: null
            },
            frequency: [
                { id: "daily", label: "Diaria" },
                { id: "monthly", label: "Mensal" },
                { id: "weekly", label: "Semestral" },
                { id: "anualy", label: "Anual" },
            ],
            loading: false,
            edit: false,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        this.user = await this.Super.get_admin(this.cache.user_logged_id)
        this.inst = await this.Super.all_email_admin_institution(this.user.email)
        this.form.instituicao_id = this.cache.institution
        if( this.user.credencial == 17 ) {
            this.form.instituicao_id = this.inst.id
        }
    },
    methods: {
        masc_money() {
            let valor = this.form.amount.replace(/\D/gi, '')
            valor = (valor/100).toLocaleString('pt-br', { minimumFractionDigits: 2 })
            this.form.amount = valor
        },
        async save() {
            let playload = {
                quantia: this.form.amount.replace('.','').replace(',',''),
                prazo: 30,
                nome: this.form.nome,
                instituicao_id: this.form.instituicao_id,
                instituicao_id: this.form.instituicao_id,
            }
            this.loading = true
            let res = await this.Super.plano_post(playload)
            this.error.status = true
            this.error.text = res?.message
            this.error.type = res?.status
            this.loading = false

            if( this.user.credencial == 17 ) {
                localStorage.setItem('user_logged_credential_id', 18)
                await this.Super.put_admin(this.user.id, {
                    credencial: 18
                }) 
                window.location.href = '#/modelo-de-emails'
                return
            }

            window.location.href = '#/planos'
        }
    }
}