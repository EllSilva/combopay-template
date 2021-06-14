import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App

export default {
    template: "#c-doadores",
    data: function () {
        return {
            cache,
            Super,
            doadores: []
        }
    },
    filters: {
        format_data( data ) {
            return data.substr(0, 10).split('-').reverse().join('/')
        }
    },
    async mounted() {
        let res = await this.Super.all_doadores()
        this.doadores = res.data
        console.log( this.doadores[0] )
    }
}
