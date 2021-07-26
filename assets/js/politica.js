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
        institution_id: null,
        loading: false,
        title: 'Betania',
        logo: {
            top: './sass/doacoesbethania.com.br/logo/2.png',
            footer: './sass/doacoesbethania.com.br/logo/1.png'
        },
        backgroundColor: '#25b3c2',
        header: {
            align: '',
            backgroundColor: '#25b3c2',
            backgoundImage: './sass/doacoesbethania.com.br/galery/1.jpg',
        },
        urlVideo: 'https://www.youtube.com/watch?v=H-GrnWRc2i4',
        layout: {
            title_depoimento: "?",
            title_video: "?",
            title_galeria: "?",
            decription_galeria: "?",
            sitacao: "?",
            bio: "?",
            copy: "?",
            logo_topo: '',
            color: '#C00',
            logo: '',
            image_1: 'default.png',
            image_2: 'default.png',
            image_3: 'default.png',
            image_4: 'default.png',
            image_5: 'default.png',
            image_6: 'default.png',
            bg_top: 'default.png',
            bg_footer: 'default.png',
        },
        galery_title: null,
        pop_id: 'QpxA_ZxGX_M',
        pop_status: false,
        footer: {
            color: '#FFFFFF',
            backgroundColor: '#25b3c2'
        },
        institution: {},
        flags: [],
        flagsIds: {},
        error: {
            status: false,
            text: 'error ao finalizar tente novamente mais tarde'
        },
        content: '',

    },
    methods: {
        error_image(e) {
            e.target.src = './assets/img/default.png'
        }       
    },
    filters: {
        getImage: (nameImage, id = 10) => `https://api.doardigital.com.br/storage/app/public/${id}/${nameImage}`,
    },
    async mounted() {
        let instituicao = (await this.Super.get_institution_by_domain(this.Domain.corruent()))
        instituicao.ativo = true
        this.institution_id = instituicao?.id
        let all_flags = await this.Super.flag_get_by_institution(this.institution_id)
        this.flagsIds = this.Domain.flags_ids(all_flags)
        this.flags = this.Domain.render_flag(all_flags)
        this.layout = { ...this.layout, ...this.flags.LAYOUT }
        this.content = this.flags.POLITICA?.data
    }
}).$mount("#app");