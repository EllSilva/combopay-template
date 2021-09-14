import App from '../library/superApp.js'
import cache from '../library/cache.js'
import mccs from '../data/mccs.js'
import viacep from '../mask/viacep.js'
import maskTel from "../mask/telefone.js"
import cpf_cnpj from "../mask/cpfCnpj.js"
import cnpj from "../mask/cnpj.js"
const Super = new App
export default {
    template: "#c-instituicao",
    data: function () {
        return {
            Super,
            cache,
            mccs,
            admins: [],
            email_admin: null,
            is_edit: true,
            message_aliases: null,
            status_aliases: null,
            form: {
                admin_master: null,
                domain_person: 'person',
                bairro: "Jennyfer Bypass",
                cidade: "Port Nikitachester",
                cnpj: "614545301",
                complemento: "Jerry Center",
                dominio: "gleichner.com",
                dominio_personalizado: "kautzer.com",
                email: "raynor.carlos@example.net",
                estado: "Minnesota",
                id: 1,
                nome_fantasia: "Pierre",
                razao_social: "Yessenia Jones",
                rua: "Nikolaus Ville",
                subdominio: "hessel.com",
                telefone: "+12525089922",
                cep: '06786-270',
                birthdate: '',
                mcc: '1',
                banco_conta: {
                    codigo_banco: "341",
                    agencia: "0932",
                    agencia_dv: "5",
                    conta: "teste",
                    tipo: "teste",
                    conta: "58054",
                    conta_dv: "1",
                    cnpj: "26268738888",
                    nome: "API BANK ACCOUNT",
                    tipo: "conta_corrente"
                }
            },
            flags: [
                "bairro",
                "cidade",
                "cnpj",
                "complemento",
                "dominio",
                "dominio_personalizado",
                "email",
                "estado",
                "id",
                "nome_fantasia",
                "razao_social",
                "rua",
                "subdominio",
                "telefone",
                "cep",
                "birthdate",
                "mcc",
            ],
            loading: false,
            feedback: {
                status: null,
                message: null
            }
        }
    },
    async mounted() {
        let instituicao = await this.Super.get_institution(this.step = this.$route.params.id)
        this.flags.forEach(key => {
            this.form[key] = instituicao[key]
        })
        this.form.admin_master = instituicao.admin_master
        this.admins = JSON.parse( atob(instituicao.anotacao) || "[]" ) || []
        console.log(instituicao )
    },
    methods: {
        async aliases() {
            this.loading = true
            let payload = {
                ...this.form,
                dominio_personalizado: 1
            }
            let res = await this.Super.put_institution(this.form.id, payload)
            this.message_aliases = res?.message
            this.status_aliases = res?.status
            this.loading = false
        },
        async save() {
            this.loading = true
            let res = await this.Super.put_institution(this.form.id, this.form)
            this.loading = false
            this.feedback.status = res?.status
            window.location.href = "#/minhas-instituicoes/1"
            this.feedback.message = res?.message
        },
        async add_admin() {
            this.admins.push(this.email_admin)
            this.email_admin = null
            let playload = {
                anotacao: btoa(JSON.stringify(this.admins)),
                admin_master: this.form.admin_master
            }
            let res = await this.Super.put_institution( this.form.id, playload )

        },
        async remove_admin(email) {
            this.admins = this.admins.filter(mail => mail != email)
            let playload = {
                anotacao: btoa(JSON.stringify(this.admins)),
                admin_master: this.form.admin_master
            }
            let res = await this.Super.put_institution( this.form.id, playload )
        },
        async busca_cep() {
            this.loading = true
            let res = await viacep(this.form.cep)
            this.form.rua = res.logradouro
            this.form.bairro = res.bairro
            this.form.cidade = res.localidade
            this.form.estado = res.uf
            this.loading = false
        },
        telefone() {
            this.form.telefone = maskTel(this.form.telefone)
        },
        cpf_cnpj() {
            this.form.cnpj = cpf_cnpj(this.form.cnpj)
        },
        cnpj() {
            this.form.banco_conta.cnpj = cnpj(this.form.banco_conta.cnpj)

        }
    }
}