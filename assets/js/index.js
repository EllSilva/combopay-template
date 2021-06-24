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
        edit: false,
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
        videos: [],
        depoimento_video: [],
        galerys: [],
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
            logo: 'default',
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
    },
    methods: {
        preview(e) {
            let input = e.target
            let name = e.target.getAttribute('data-name')
            var reader = new FileReader();
            reader.onload = async (e) => {
                this.loading = true
                this.logo = e.target.result
                let res = await this.Super.upload(this.institution_id, input.files[0])
                this.layout[name] = res.nomeImagem
                await this.Super.flag_put(this.flagsIds.LAYOUT, {
                    base64: btoa(JSON.stringify(this.layout)),
                    flag: 'LAYOUT',
                    instituicao_id: this.institution_id
                })
                this.loading = false
            }
            reader.readAsDataURL(input.files[0]);
        },
        error_image(e) {
            e.target.src = './assets/img/default.png'
        },
        async add_galery() {
            let input = this.$refs.image_galery
            this.loading = true
            let res = await this.Super.upload(this.institution_id, input.files[0])
            let playload = {
                src: res.nomeImagem,
                title: this.galery_title,
            }
            this.galerys.push(playload)
            await this.Super.flag_put(this.flagsIds.GALERIA, {
                base64: btoa(JSON.stringify(this.galerys)),
                flag: 'GALERIA',
                instituicao_id: this.institution_id
            })
            this.loading = false

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
        sair() {
            this.cache.edit = false
            window.history.back()
        },
        error_domain(response) {
            if ( response.status == 'error') {
                window.location.href = '/pagina-em-manutencao.html'
            }
        }

    },
    filters: {
        getIdYoutube: url => new URL(url).searchParams.get('v'),
        getTumb: id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        getImage: (nameImage, id = 10) => `https://api.doardigital.com.br/storage/app/public/${id}/${nameImage}`,
    },
    async mounted() {
        console.log( this.Domain.corruent() )


        let instituicao = (await this.Super.get_institution_by_domain(this.Domain.corruent()))
        this.error_domain(instituicao)
        
        this.institution_id = instituicao?.id
        
        this.edit = this.cache.edit

        let all_flags = await this.Super.flag_get_by_institution(this.institution_id)
        this.flagsIds = this.Domain.flags_ids(all_flags)
        this.flags = this.Domain.render_flag(all_flags)



        this.videos = this.flags.VIDEOS
        this.depoimento_video = this.flags.DEPOIMENTOS
        this.galerys = this.flags.GALERIA
        this.layout = { ...this.layout, ...this.flags.LAYOUT }


    }
}).$mount("#app");