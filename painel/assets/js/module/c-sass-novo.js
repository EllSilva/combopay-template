import App from '../library/superApp.js'
import cache from '../library/cache.js'
import mccs from '../data/mccs.js'
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
                domain_person: null,
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
            },          
            // form: {
            //     domain_person: 'person',
            //     bairro: 'b',
            //     cidade: 'b',
            //     cnpj: 'b',
            //     complemento: 'b',
            //     dominio: 'brc.com',
            //     dominio_personalizado: true,
            //     email: 'b',
            //     estado: 'b',
            //     id: 1,
            //     nome_fantasia: 'b',
            //     razao_social: 'b',
            //     rua: 'b',
            //     subdominio: 'brc',
            //     telefone: 'b',
            //     cep: 'b',
            //     birthdate: 'b',
            //     atividade: '1',
            // },
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
        }
    }
}