import Vue from './library/vue.js'
import cache from './library/cache.js'

globalThis.app = new Vue({
    data: {
        cache,
        boleto_code: null,
        boleto_link: null,
    },
    async mounted() {        
        this.boleto_code = this.cache.boleto_code != 'false' ? this.cache.boleto_code : null
        this.boleto_link = this.cache.boleto_link != 'false' ? this.cache.boleto_link : null
    }
}).$mount("#app");