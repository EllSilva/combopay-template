import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-script",
    data: function () {
        return {
            Super,
            cache,
            playload: {
                header: '',
                body: '',
                footer: ''
            },
            is_flag: false,
            loading: false,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        let res = (await this.Super.flag_all()).data
        let is_flag = 'SCRIPTS_PAGES'
        let flag = res.find( post => post.flag == is_flag && post.instituicao_id == this.cache.institution )
        if( flag ) {            
            let data = JSON.parse( atob( flag.base64 ) )
            this.playload.header = data.header
            this.playload.body = data.body
            this.playload.footer = data.footer
        }else {
            this.is_flag = true
        }
    },
    methods: {
        async save() {
            this.loading = true
            let res = await this.Super.flag_put( this.cache.institution, {
                flag: 'SCRIPTS_PAGES',
                instituicao_id: this.cache.institution,
                base64: btoa( JSON.stringify(this.playload) )
            } )
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false
        }
    }
}