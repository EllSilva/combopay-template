import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App

export default {
    template: "#c-config",
    data: function () {
        return {
            Super,
            cache,
            name_flag: 'CONFIG_SITE',
            loading: false,
            playload: {
                id:null,
                title: null,
                description: null,
                tag: null,
                cor_main: null,
                cor_secundary: null,
            },
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        let res = (await this.Super.flag_all()).data
        let flag = res.find( post => post.flag == this.name_flag && post.instituicao_id == this.cache.institution )
        if( !flag ) {
            let new_flag = await this.Super.flag_post( {
                flag: this.name_flag,
                instituicao_id: this.cache.institution,
                base64: btoa( JSON.stringify(this.playload) )
            } )
        }else {
            let data = JSON.parse( atob( flag.base64 ) )
            this.playload.id = data.id
            this.playload.title = data.title
            this.playload.description = data.description
            this.playload.tag = data.tag
            this.playload.cor_main = data.cor_main
            this.playload.cor_secundary = data.cor_secundary
        }

    },
    methods: {
        async save() {
            this.loading = true
            console.log( this.playload )
            let res = await this.Super.flag_put( this.cache.institution, {
                flag: this.name_flag,
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