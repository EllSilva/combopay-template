import Vue from './library/vue.js'
import cache from './library/cache.js'

globalThis.app = new Vue({
    data: {
        cache,
        boleto_code: null,
        boleto_link: null,
    },
    async mounted() {
        console.log( 'ok' )
        this.boleto_code = this.cache.boleto_code
        this.boleto_link = this.cache.boleto_link
    }
}).$mount("#app");