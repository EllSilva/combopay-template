import App from '../library/superApp.js'
import cache from '../library/cache.js'
import templates_emails from '../data/modelos-emails.js'
import tags from '../data/tag-email.js'
const Super = new App

export default {
    template: "#c-emails-edit",
    data: function () {
        return {
            Super,
            cache,
            templates_emails,
            tags,
            email_id: null,
            title: null,
            cat: null,
            id: null,
            text: null,
            is_flag: false,
            playload: templates_emails,
            flag: 'ALL_TEMPLATE_EMAIL',
            flag_id: null,
            loading: false,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        this.load()
    },
    methods: {
      
        async load() {
            this.id =  this.$route.params.id
            this.flag_id =  this.$route.params.flag_id

            this.playload = JSON.parse( atob( (await this.Super.flag_get(this.flag_id)).base64 ) )
            
            let email = this.playload.find( e => e.id == this.id )

            this.email_id = email.id
            this.text = email.text
            this.cat = email.cat
            this.title = email.title

           
        },
        async save() {

            this.loading = true

            this.playload =  this.playload.map(e => {
                if(e.id == this.email_id) {
                    e.text = this.text
                    e.title = this.title
                }
                return e
            })
            let playload = {
                base64: btoa(JSON.stringify(this.playload)),
                flag: this.flag,
                instituicao_id: this.cache.institution,
                ativo: 1,
            }
            let res = await this.Super.flag_put(this.flag_id, playload)

            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status

            this.loading = false

            return
         
        }
    }
}