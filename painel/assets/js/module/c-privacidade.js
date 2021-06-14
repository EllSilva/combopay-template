import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App

export default {
    template: "#c-privacidade",
    data: function () {
        return {
            Super,
            cache,
            loading: false,
            name_flag: 'POLITICA',
            playload: '',
            content: '',
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            } 
        }
    },
    methods: {
        title() {
            document.execCommand('formatBlock', false, '<h2>');
        },
        bold() {
            document.execCommand('bold');
        },
        italic() {
            document.execCommand('italic');
            
        },
        list() {
            document.execCommand('insertUnorderedList');
        },
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
        },
        input(e) {
            this.playload = e.target.innerHTML
        }
    },
    async mounted() {
        let res = (await this.Super.flag_all()).data
        let flag = res.find(post => post.flag == this.name_flag && post.instituicao_id == this.cache.institution)
        if (!flag) {
            let new_flag = await this.Super.flag_post({
                flag: this.name_flag,
                instituicao_id: this.cache.institution,
                base64: btoa(JSON.stringify(this.playload))
            })
        } else {
            let data = JSON.parse(atob(flag.base64))
            this.playload = data
            this.content = data
        }
    },
}