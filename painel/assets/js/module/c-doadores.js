import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App

export default {
    template: "#c-doadores",
    data: function () {
        return {
            cache,
            Super,
            doadores: [],
            link: '',
            backup: [],
            ids: [],
            periodo: Date.now(),
            data_min: null,
            data_max: null,
            status: 1,
            tipo: 1,
            s: '',
        }
    },
    filters: {
        format_data( data ) {
            return data.substr(0, 10).split('-').reverse().join('/')
        }
    },
    async mounted() {
        let res = await this.Super.all_doadores_by_istitution(this.cache.institution)
        this.doadores = res
        this.backup = res
        let link = 'data:text/csv;charset=utf-8,'
        link += this.doadores.map( dc => Object.values(dc).join(';')+'%0A' )
        this.link = link
    }
}
