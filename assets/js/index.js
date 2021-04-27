import Vue from './library/vue.js'

globalThis.app = new Vue({
    data: {
        title: 'Betania',
        header: {            
            backgroundColor: '#C00',
        },
        logo: null,
        urlVideo: 'https://www.youtube.com/watch?v=H-GrnWRc2i4',
        videos: [
            'https://www.youtube.com/watch?v=H-GrnWRc2i4',
        ],
        galerys: [],
        galery_title: null,
        pop_id: 'QpxA_ZxGX_M',
        pop_status: false,
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


