import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-sass",
    data: function () {
        return {
            Super,
            playload: [],
            steps: [],
            step: 1,
            default_flags: [
                'VIDEOS', 
                'DEPOIMENTOS', 
                'GALERIA', 
                'LAYOUT', 
                'CONFIG_SITE',
                'METAS_2021',
                'SCRIPTS_PAGES',
            ],
            default_flags_content: {
                'METAS_2021' : btoa(JSON.stringify([])), 
                'VIDEOS' : btoa(JSON.stringify([])), 
                'DEPOIMENTOS' : btoa(JSON.stringify([])), 
                'GALERIA' : btoa(JSON.stringify([])), 
                'LAYOUT' : btoa(JSON.stringify({})),
                'CONFIG_SITE' : btoa(JSON.stringify({})),
                'SCRIPTS_PAGES' : btoa(JSON.stringify({})),
            },
        }
    },
    methods: {
        async load( step ) {
            this.steps = []
            let all_institution = await this.Super.all_institution( step )
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
                console.log(playload)
            });

            
        }
    },
    async mounted() {
        this.step = this.$route.params.step
        await this.load( this.step )
        console.log(this.playload)
    }
}


