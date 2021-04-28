import Vue from './library/vue.js'

globalThis.app = new Vue({
    data: {
        title: 'Betania',
        header: {            
            backgroundColor: '#25b3c2',
            backgoundImage: './sass/doacoesbethania.com.br/galery/1.jpg',
        },
        logo: './assets/logo/logo.svg',
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
        }
    },
    methods: {
        preview() {
            let input = this.$refs.logo
            var reader = new FileReader();
            reader.onload = (e) => {
                this.logo =  e.target.result
            }

            reader.readAsDataURL(input.files[0]);
        }, 
        add_galery() {
            let input = this.$refs.image_galery
            var reader = new FileReader();
            reader.onload = (e) => {                  
                this.galerys.push( {
                    src:  e.target.result,
                    title: this.galery_title
                })
            }
            reader.readAsDataURL(input.files[0]);
        },
        addVideo() { this.videos.push( this.urlVideo ) }
    },
    filters: {
        getIdYoutube: url => new URL( url ).searchParams.get('v'),
        getTumb: id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    }
}).$mount("#app");


