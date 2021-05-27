import Vue from './library/vue.js'
import SuperApp from './library/SuperApp.js'

const Super = new SuperApp
globalThis.app = new Vue({
    data: {
        Super,
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
        videos: [
            'https://www.youtube.com/watch?v=NatrfQRSJMU',
            'https://www.youtube.com/watch?v=wacNNeEpUfo',
        ],
        depoimento_video: [
            'https://www.youtube.com/watch?v=FRSMONLcaqE',
            'https://www.youtube.com/watch?v=1EKUno_uRfM',
        ],
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
        galery_title: null,
        pop_id: 'QpxA_ZxGX_M',
        pop_status: false,
        footer: {
            color: '#FFFFFF',
            backgroundColor: '#25b3c2'
        },
        institution: {},
        flags: [],
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
        addVideo() { this.videos.push(this.urlVideo) },
        getDomain() {
            return window.location.hostname
        },
    },
    filters: {
        getIdYoutube: url => new URL(url).searchParams.get('v'),
        getTumb: id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    },
    async mounted() {

        let all_institution = (await this.Super.all_institution()).data
        let domain = this.getDomain()
        let validacao = institution => institution.dominio == domain || institution.dominio_personalizado == domain
        let institution = all_institution.find( validacao )
        this.institution_id = institution.id

        this.institution = await this.Super.get_institution(institution.id)
        this.flags = (await this.Super.flag_get_by_institution(institution.id)).data

        console.log('ok')
        
    }
}).$mount("#app");