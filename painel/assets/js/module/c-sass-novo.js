import App from '../library/superApp.js'
import cache from '../library/cache.js'
import mccs from '../data/mccs.js'
import viacep from '../mask/viacep.js'
import maskTel from "../mask/telefone.js"
import cpf_cnpj from "../mask/cpfCnpj.js"
import cnpj from "../mask/cnpj.js"
import black from "../data/black-list.js"

const Super = new App

export default {
    template: "#c-instituicao",
    data: function () {
        return {
            Super,
            cache,
            black,
            mccs,
            admins: [],
            email_admin: null,
            is_edit: false,
            form: {
                admin_master: null,
                domain_person: 'sub',
                bairro: "",
                cidade: "",
                cnpj: "",
                complemento: "",
                dominio: "",
                dominio_personalizado: 0,
                email: "",
                estado: "",
                id: 1,
                nome_fantasia: "",
                razao_social: "",
                rua: "",
                subdominio: "",
                telefone: "",
                cep: "",
                birthdate: "",
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
                },
                anotacao: btoa( JSON.stringify({ status: 1 }) )
            },          
            loading: false,
            feedback: {
                status: null,
                message: null
            }
        }
    },
    async mounted() {
       this.form.admin_master = localStorage.getItem('email')
    },
    methods: {
        async save() {
            this.loading = true
            this.form.dominio_personalizado = this.form.domain_person == 'sub' ? 1 : 0
            if( this.black.includes(this.form.subdominio) ) {
                this.feedback.status = 'error'
                this.feedback.message = "Dominio Indosponiveis"
                this.loading = false
                return
            }
            let res = await this.Super.post_institution( this.form )          
            this.feedback.status = res?.status            
            if(res?.status != 'error' && !this.black.includes(this.form.subdominio) ) {
                window.location.href = "#/minhas-instituicoes/1"
            }
            this.feedback.message = res?.message
            this.loading = false
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