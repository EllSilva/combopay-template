import Vue from './library/vue.js'
import SuperApp from './library/SuperApp.js'
import Domain from './library/Domain.js'
import cache from './library/cache.js'

const Super = new SuperApp

globalThis.app = new Vue({
    data: {
        cache,
        Super,
        Domain,
        base: null,
        inst: {
            bairro: null,
            cep: null,
            cidade: null,
            cnpj: null,
            complemento: null,
            email: null,
            estado: null,
            nome_fantasia: null,
            razao_social: null,
            rua: null,
            telefone: null,
        },
        backgroundColor: '#FFF',
        layout: {
            logo: './assets/img/default.png',
        },
        boleto_code: null,
        boleto_link: null,
        type: 'card_cred',
        qr: null
    },
    async mounted() {
        this.base = this.Domain.corruent()
        let instituicao = (await this.Super.get_institution_by_domain(this.Domain.corruent()))
        this.inst = instituicao

        let flag_all = (await this.Super.flag_get_by_institution(instituicao.id)).reverse()
        let config_site = JSON.parse(atob(flag_all.find(post => post.flag == 'CONFIG_SITE').base64))
        if (config_site.logo) {
            this.layout.logo = `https://api.doardigital.com.br/storage/app/public/${instituicao.id}/${config_site.logo}`
        }
        if (config_site.cor_main) {
            this.backgroundColor = config_site.cor_main
        }

        this.type = localStorage.getItem('type_paymente')
        this.boleto_code = localStorage.getItem('BAR_CODE')
        this.boleto_link = localStorage.getItem('LINK_BOLETO')
        this.qr = localStorage.getItem('qr')

        if (this.type == 'pix') {
            let code_pix =  `${this.qr}`
            var qrcode = new QRCode(this.$refs.print_qr, {
                text: code_pix,
                width: 230,
                height: 230,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L
            });
        }
    },
    methods: {
        copiar(ref) {
            this.$refs[ref].select(); document.execCommand('copy');
        }
    }
}).$mount("#app");