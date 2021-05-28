import Vue from './library/vue.js'
import SuperApp from './library/SuperApp.js'
import Domain from './library/Domain.js'

const Super = new SuperApp
globalThis.app = new Vue({
    data: {
        Super,
        Domain,
        institution_id: null,
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
        videos: [],
        depoimento_video: [],
        galerys: [
            { src: './sass/doacoesbethania.com.br/galery/1.jpg', title: 'Dinâmicas de Grupo' },
            { src: './sass/doacoesbethania.com.br/galery/2.jpg', title: 'Momentos de Partilhas' },
            { src: './sass/doacoesbethania.com.br/galery/3.jpg', title: 'Espiritualidade Encarnada' },
            { src: './sass/doacoesbethania.com.br/galery/4.jpg', title: 'Projeto de Vida' },
            { src: './sass/doacoesbethania.com.br/galery/5.jpg', title: 'Alimentação Saudável' },
            { src: './sass/doacoesbethania.com.br/galery/6.jpg', title: 'Pedagogia em Prática' },
            { src: './sass/doacoesbethania.com.br/galery/7.jpg', title: 'Virtude da Disciplina' },
            { src: './sass/doacoesbethania.com.br/galery/8.jpg', title: 'Adoração ao Santíssimo' },
        ],
        layout: {
            title_depoimento: "?",
            title_video: "?",
            title_galeria: "?",
            decription_galeria: "?",
            sitacao: "?",
            bio: "?",
            copy: "?"
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
    },
    methods: {
        preview() {
            let input = this.$refs.logo
            var reader = new FileReader();
            reader.onload = (e) => {
                this.logo = e.target.result
            }

            reader.readAsDataURL(input.files[0]);
        },
        add_galery() {
            let input = this.$refs.image_galery
            var reader = new FileReader();
            reader.onload = (e) => {
                this.galerys.push({
                    src: e.target.result,
                    title: this.galery_title
                })
            }
            reader.readAsDataURL(input.files[0]);
        },
        addVideo() {
            this.videos.push(this.urlVideo)
            this.put_videos()
        },
        addDepoimentos() {
            this.depoimento_video.push(this.urlVideo)
            this.put_depoimento_videos()
        },
        getDomain() {
            return window.location.hostname
        },
        is_site_active(status = true) {
            if (!status)
                window.location.href = "/pagina-em-manutencao.html"
        },
        async exist_flags() {
            let list_flags = Object.keys(this.flags)
            this.Domain.default_flags.forEach(flag_name => {
                if (!list_flags.includes(flag_name)) {
                    let playload = {
                        base64: this.Domain.default_flags_content[flag_name] || btoa(JSON.stringify({})),
                        flag: flag_name,
                        instituicao_id: this.institution_id
                    }
                    this.Super.flag_post(playload)
                }
            })
        },
        async put_videos() {
            let res = await this.Super.flag_put(this.flagsIds.VIDEOS, {
                base64: btoa(JSON.stringify(this.videos)),
                flag: 'VIDEOS',
                instituicao_id: this.institution_id
            })
        },
        async put_depoimento_videos() {
            let res = await this.Super.flag_put(this.flagsIds.DEPOIMENTOS, {
                base64: btoa(JSON.stringify(this.depoimento_video)),
                flag: 'DEPOIMENTOS',
                instituicao_id: this.institution_id
            })
        },
        async put_layout(e) {
            let name = e.target.getAttribute('name')
            this.layout[name] = e.target.innerText
            let res = await this.Super.flag_put(this.flagsIds.LAYOUT, {
                base64: btoa(JSON.stringify(this.layout)),
                flag: 'LAYOUT',
                instituicao_id: this.institution_id
            })
        },
        

    },
    filters: {
        getIdYoutube: url => new URL(url).searchParams.get('v'),
        getTumb: id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    },
    async mounted() {

        let instituicao = (await this.Super.get_institution_by_domain(this.Domain.corruent()))
        instituicao.ativo = true
        this.is_site_active(instituicao?.ativo)
        this.institution_id = instituicao?.id


        let all_flags = await this.Super.flag_get_by_institution(this.institution_id)
        this.flagsIds = this.Domain.flags_ids(all_flags)
        this.flags = this.Domain.render_flag(all_flags)


        this.exist_flags()
        
        this.videos = this.flags.VIDEOS
        this.depoimento_video = this.flags.DEPOIMENTOS
        this.layout = { ...this.layout, ...this.flags.LAYOUT}


    }
}).$mount("#app");