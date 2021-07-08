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
            is_flag: false,
            templates_emails,
            playload: templates_emails,
            flag: 'ALL_TEMPLATE_EMAIL',
        }
    },
    async mounted() {
        this.load()
    },
    methods: {
        async load() {
            let all_flags = await this.Super.flag_get_by_institution(this.cache.institution)
            let flag = all_flags.find(post => post.flag == this.flag)
            if (flag) {
                this.playload = JSON.parse(atob(flag.base64.replace(/\s/gi, '+')))
            } else {
                this.is_flag = true
            }
        },
    }
}