import App from '../library/superApp.js'
import cache from '../library/cache.js'
import templates_emails from '../data/modelos-emails.js'
const Super = new App

export default {
    template: "#c-emails",
    data: function () {
        return {
            Super,
            cache,
            templates_emails,
            playload: templates_emails,
            flag: 'ALL_EMAIL_TEMPLATE',
        }
    },
    async mounted() {
        this.load()       
    },
    methods: {
        async create_flag() {
            let playload = {
                base64: btoa(JSON.stringify(this.templates_emails)),
                flag: this.flag,
                instituicao_id: this.cache.institution,
                ativo: 1,
            }
            return await this.Super.flag_post( playload )
        },
        async load() {
            let all_flags = await this.Super.flag_get_by_institution(this.cache.institution)
            let flag = all_flags.find( post => post.flag == this.flag )
            if( !flag ) {
                await this.create_flag()
                await this.load()
                return
            }
            this.playload = JSON.parse( atob( flag.base64.replace(/\s/gi, '+') ) )
        },
    }
}