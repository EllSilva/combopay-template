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
            is_flag: false,
            id: null,
            my_logo: './assets/img/default.png',
            playload: {
                id: null,
                title: null,
                description: null,
                tag: null,
                cor_main: null,
                cor_secundary: null,
                logo: null,
            },
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    async mounted() {
        let res = (await this.Super.flag_get_by_institution(this.cache.institution)).reverse()
        let flag = res.find(post => post.flag == this.name_flag)
        let data = JSON.parse(atob(flag.base64))

        this.id = flag.id
        this.playload.id = data?.id
        this.playload.title = data?.title
        this.playload.description = data?.description
        this.playload.tag = data?.tag
        this.playload.cor_main = data?.cor_main
        this.playload.logo = data?.logo

        if(this.playload.logo) {
            this.my_logo = `https://api.doardigital.com.br/storage/app/public/${this.cache.institution}/${this.playload.logo}`
        }        

    },
    methods: {
        async save() {
            this.loading = true

            if (this.my_logo.substr(0, 4) == 'data') {
                let form = new FormData(this.$refs.f_logo)
                form.append('instituicao_id', this.cache.institution);
                let up = (await this.Super.upload(form)).nomeImagem
                this.playload.logo = up
            }

            let playload = {
                base64: btoa(JSON.stringify(this.playload)),
                flag: this.name_flag,
                instituicao_id: this.cache.institution,
                ativo: 1,                
            }

            let res = await this.Super.flag_put(this.id, playload)

            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false

        },
        preview(e) {
            console.log(e)
            let input = e.target
            let name = e.target.getAttribute('data-name')
            var reader = new FileReader();
            reader.onload = async (e) => {
                this.my_logo = e.target.result
            }
            reader.readAsDataURL(input.files[0]);
        },
    }
}