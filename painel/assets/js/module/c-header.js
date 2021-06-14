import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-header",
    data: function() {
        return {
            Super,
            cache,
            id: 0,
            instituicoes: []
        }
    },
    async mounted() {
        let todas_intituicoes = await this.Super.all_institution()
        this.id = this.cache.institution
        this.instituicoes = todas_intituicoes.data
    }
}