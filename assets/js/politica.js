import Vue from './library/vue.js'
import SuperApp from './library/SuperApp.js'
import Domain from './library/Domain.js'
import cache from './library/cache.js'

const Super = new SuperApp
globalThis.app = new Vue({
    data: {
        Super,
        Domain,
        cache,
        inst: null, 
        logo: './assets/img/default.png',
        backgroundColor: "#FFF",

        nome_fantasia: '...',
        cnpj: '...',
        endereco: '...',

    },
    methods: { },
    async mounted() {
        this.base = this.Domain.corruent()
        let instituicao = (await this.Super.get_institution_by_domain(this.Domain.corruent()))
        this.inst = instituicao

        this.nome_fantasia = instituicao.nome_fantasia
        this.cnpj = "CNPJ:" + instituicao.cnpj
        this.endereco = ""
        this.endereco += "CEP" + instituicao.cep + " - "
        this.endereco += "" + instituicao.rua  + " - "
        this.endereco += "" + instituicao.complemento  + " - "
        this.endereco += "" + instituicao.bairro  + " - "
        this.endereco += "" + instituicao.cidade  + " - "
        this.endereco += "" + instituicao.estado  + " - "

        let flag_all = (await this.Super.flag_get_by_institution(instituicao.id)).reverse()
        let config_site = JSON.parse(atob(flag_all.find(post => post.flag == 'CONFIG_SITE').base64))
        if(config_site.logo) {
            this.logo = `https://api.doardigital.com.br/storage/app/public/${instituicao.id}/${config_site.logo}`
        }
        if(config_site.cor_main) {
            this.backgroundColor = config_site.cor_main
        }        
    }
}).$mount("#app");