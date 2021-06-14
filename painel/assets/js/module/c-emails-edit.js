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
            title: null,
            cat: null,
            id: null,
            text: null,
            playload: templates_emails,
            flag: 'ALL_MAIL_TEMPLATE',
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
            this.flag_id = flag.id
            this.playload = JSON.parse( atob( flag.base64.replace(/\s/gi, '+') ) )
            this.id = this.id = this.$route.params.id
            let email_corruente = this.playload.find( post => post.id == this.id )
            console.log( email_corruente )
            this.text = email_corruente.text
            this.cat = email_corruente.cat
            this.title = email_corruente.title
        },
        async save() {
            this.loading = true
            this.playload = this.playload.map( post => {
                if( post.id == this.id ) {
                    post.title = this.title
                    post.text = this.text
                }
                return post
            } )
            let playload = {
                base64: btoa(JSON.stringify(this.templates_emails)),
                flag: this.flag,
                instituicao_id: this.cache.institution,
                ativo: 1,
            }
            let res = await this.Super.flag_put(this.flag_id, playload )
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false
        }
    }
}