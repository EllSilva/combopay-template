import App from '../library/superApp.js'
import cache from '../library/cache.js'
import templates_emails from '../data/modelos-emails.js'
const Super = new App

export default {
    template: "#c-emails",
    data: function () {
        return {
            id: null,
            Super,
            cache,
            user: {
                credencial: null
            },
            is_flag: false,
            templates_emails,
            playload: templates_emails,
            flag: 'ALL_TEMPLATE_EMAIL',
        }
    },
    async mounted() {
        this.user = await this.Super.get_admin(this.cache.user_logged_id)
        this.load()
    },
    methods: {
        async load() {
            let all_flags = (await this.Super.flag_get_by_institution(this.cache.institution)).reverse()
            let flag = all_flags.find(post => post.flag == this.flag)
            let data = JSON.parse( atob( flag?.base64 || "W10=" ) )
            data = data.length ? data : templates_emails
            this.playload = data
            this.id = flag?.id        
        },
        async tootle_statu(id_email) {
            this.playload =  this.playload.map(e => {
                if(e.id == id_email) {
                    e.status = !e.status
                }
                return e
            })
            let playload = {
                base64: btoa(JSON.stringify(this.playload)),
                flag: this.flag,
                instituicao_id: this.cache.institution,
                ativo: 1,
            }
            let res = await this.Super.flag_put(this.id, playload)
        },
        async pular() {
            localStorage.setItem('user_logged_credential_id', 20)
            await this.Super.put_admin(this.user.id, {
                credencial: 20
            }) 
            window.location.href = '#/inicio'            
        }
    }
}