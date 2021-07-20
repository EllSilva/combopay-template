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
            is_edit: false,
            form: {
                domain_person: 'sub',
                bairro: null,
                cidade: null,
                cnpj: null,
                complemento: null,
                dominio: null,
                dominio_personalizado: null,
                email: null,
                estado: null,
                id: 1,
                nome_fantasia: null,
                razao_social: null,
                rua: null,
                subdominio: null,
                telefone: null,
                cep: null,
                birthdate: null,
                atividade: '1',
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
            loading: false,
            feedback: {
                status: null,
                message: null
            }
        }
    },
    async mounted() {
       
    },
    methods: {
        async save() {
            this.loading = true
            this.form.dominio_personalizado = true
            let res = await this.Super.post_institution( this.form )
            console.log(res)
            this.loading = false
            this.feedback.status = res?.status
            window.location.href = "#/minhas-instituicoes/1"
            this.feedback.message = res?.message
        },
        async add_admin() {
            this.admins.push(this.email_admin)
        },
        async remove_admin(email) {
            this.admins = this.admins.filter( mail => mail != email )
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
            this.form.telefone = maskTel(this.form.telefone )           
        },
        cpf_cnpj() {
            this.form.cnpj = cpf_cnpj(this.form.cnpj )           
        },
        cnpj() {
            this.form.banco_conta.cnpj = cnpj(this.form.banco_conta.cnpj )           

        }
    }
}