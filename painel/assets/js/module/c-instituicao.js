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
            form: {
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
                atividade: '1',
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
                "atividade",
            ],
            loading: false,
            feedback: {
                status: null,
                message: null
            }
        }
    },
    async mounted() {
        let instituicao = await this.Super.get_institution( this.cache.institution )
        console.log( instituicao )
        this.flags.forEach( key => {
            this.form[key] = instituicao[key]
        } )
    },
    methods: {
        async save() {
            this.loading = true
            let res = await this.Super.put_institution( this.form.id, this.form )
            console.log( res )
            this.loading = false
            this.feedback.status = res?.status
            this.feedback.message = res?.message
        }
    }
}