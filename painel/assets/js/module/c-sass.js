import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-sass",
    data: function () {
        return {
            Super,
            cache,
            playload: [],
            steps: [],
            step: 1,
            s: null,
            user: null,
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
        }
    },
    methods: {
        async load( step ) {
            this.steps = []
            let all_institution = {data:[]}
            if(this.user.credencial!=1) {
                all_institution = await this.Super.all_email_admin_institution(this.user.email)
                if(all_institution.id) {
                    all_institution = {data:[all_institution]}
                }
            }
            if(this.user.credencial==1) {
                all_institution = await this.Super.all_institution( step )                
            }
            this.playload = all_institution.data
            let total_pages = Math.ceil( all_institution.total / 10 )
            for (let index = 0; index < total_pages; index++) {
                this.steps.push( index )            
            }
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
        async search() {            
            let res = await this.Super.search_institution(this.s)
            this.playload = res
        },
        status( id, status ) {
            this.Super.status_institution(id, {
                ativo: status ? false : true
            })
        }
    },
    async mounted() {
        this.step = this.$route.params.step
        this.user = await this.Super.get_admin(this.cache.user_logged_id)
        await this.load( this.step )
    }
}