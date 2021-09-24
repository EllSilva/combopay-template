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
            user: {
                credencial: null
            },
            admins: [],
            email_admin: null,
            is_edit: false,
            message_aliases: null,
            status_aliases: null,
            default_flags: [
                'VIDEOS', 
                'DEPOIMENTOS', 
                'GALERIA', 
                'LAYOUT', 
                'CONFIG_SITE',
                'METAS_2021',
                'SCRIPTS_PAGES',
                'POLITICA',
                'RD_STATION',
                'CORREIOS',
                'MAILING_BOSS',
                'PHP_MAILER',
                'E_VENDAS',
                'ALL_TEMPLATE_EMAIL',
                'CUPOM',
                'DIVISAO',
            ],
            default_flags_content: {
                'CUPOM' : "W10=", 
                'DIVISAO' : "W10=", 
                'METAS_2021' : "W10=", 
                'VIDEOS' : "W10=", 
                'ALL_TEMPLATE_EMAIL' : "W10=", 
                'DEPOIMENTOS' : "W10=", 
                'GALERIA' : "W10=", 
                'LAYOUT' : btoa(JSON.stringify({})),
                'CONFIG_SITE' : btoa(JSON.stringify({})),
                'SCRIPTS_PAGES' : btoa(JSON.stringify({})),
                'RD_STATION' : btoa(JSON.stringify({})),
                'CORREIOS' : btoa(JSON.stringify({})),
                'MAILING_BOSS' : btoa(JSON.stringify({})),
                'PHP_MAILER' : btoa(JSON.stringify({})),
                'E_VENDAS' : btoa(JSON.stringify({})),
                'POLITICA' : btoa(JSON.stringify({})),
            },
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
                    codigo_banco: "",
                    agencia: "",
                    agencia_dv: "",
                    conta: "",
                    tipo: "",
                    conta: "",
                    conta_dv: "1",
                    cnpj: "",
                    nome: "",
                    tipo: "conta_corrente"
                },
                anotacao: btoa(JSON.stringify({ status: 1 }))
            },
            loading: false,
            feedback: {
                status: null,
                message: null
            }
        }
    },
    async mounted() {
        this.user = await this.Super.get_admin(this.cache.user_logged_id)
        this.form.admin_master = this.user.email
    },
    methods: {
        async save() {
            this.loading = true
            this.form.dominio_personalizado = this.form.domain_person == 'sub' ? 1 : 0
            if (this.black.includes(this.form.subdominio)) {
                this.feedback.status = 'error'
                this.feedback.message = "Dominio Indosponiveis"
                this.loading = false
                return
            }

            let res = await this.Super.post_institution(this.form)
            this.loading = false
            this.feedback.status = res?.status
            this.feedback.message = res?.message

            if (res?.status != 'error' && !this.black.includes(this.form.subdominio)) {
                this.loading = true
                let subdominio = this.form.subdominio
                let minha_nova_instituicao = await this.Super.get_institution_by_domain(subdominio)
                this.cache.institution = minha_nova_instituicao.id

                this.run(minha_nova_instituicao.id)

                let playload = {
                    quantia: "2500",
                    prazo: 30,
                    nome: "Plano 25",
                    instituicao_id: minha_nova_instituicao.id,
                }
                await this.Super.plano_post(playload)

                playload.quantia = "5000"
                playload.nome = "Plano 50"
                await this.Super.plano_post(playload)

                playload.quantia = "7500"
                playload.nome = "Plano 75"
                await this.Super.plano_post(playload)

                playload.quantia = "10000"
                playload.nome = "Plano 100"
                await this.Super.plano_post(playload)

                playload.quantia = "20000"
                playload.nome = "Plano 200"
                await this.Super.plano_post(playload)
                this.loading = false

            }

            if( this.user.credencial == 16 ) {
                localStorage.setItem('user_logged_credential_id', 17)
                this.loading = true
                await this.Super.put_admin(this.user.id, {
                    credencial: 17
                }) 
                this.loading = false
                window.location.href = '#/planos'
                return
            }
            
            if (res?.status != 'error' && !this.black.includes(this.form.subdominio)) {
                window.location.href = "#/minhas-instituicoes/1"
            }  
            

        },
        async add_admin() {
            this.admins.push(this.email_admin)
        },
        async remove_admin(email) {
            this.admins = this.admins.filter(mail => mail != email)
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

        },
        run( id ) {
            this.default_flags.forEach( is_flag => {
                let playload = { 
                    base64: this.default_flags_content[is_flag], 
                    flag: is_flag, 
                    instituicao_id: id,
                    ativo: 1,
                }
                this.Super.flag_post(playload)
            });            
        },
    }
}