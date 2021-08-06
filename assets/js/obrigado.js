import Vue from './library/vue.js'
import SuperApp from './library/SuperApp.js'
import Domain from './library/Domain.js'
import cache from './library/cache.js'

const Super = new SuperApp

globalThis.app = new Vue({
    data: {
        cache,
        Super,
        boleto_code: null,
        boleto_link: null,
        type: 'card_cred'
    },
    async mounted() {
        this.type = localStorage.getItem('type_paymente')
        this.boleto_code = localStorage.getItem('BAR_CODE')
        this.boleto_link = localStorage.getItem('LINK_BOLETO')
    },
    methods: {
        copy() {
            navigator.clipboard.readText().then(text => outputElem.innerText = text);
            const texto = document.getElementById("texto");
            const btnCopiador = document.getElementById("btnCopiador");
            btnCopiador.addEventListener("click", function () {
                texto.select();
                document.execCommand("Copy");
            });
        }
    }
}).$mount("#app");