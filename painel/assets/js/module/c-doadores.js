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
        let all_doacoes = await this.Super.all_doacao_by_institution(this.cache.institution)
        let todos_doadores = all_doacoes.reduce((acc, iten) => {
            let doador_id = parseInt( iten?.doador_id )
            if(!doador_id) return acc
            if( !acc.includes( doador_id )) {
                acc.push(doador_id)
            }
            return acc
        }, [])

        todos_doadores = await Promise.all( todos_doadores.map( async id => {
            let doador = await this.Super.get_doador(id)
            return doador
        } ) )        
        
        // let res = (await this.Super.all_doadores_by_istitution(this.cache.institution)).reverse()
        
        globalThis._doadores = todos_doadores
        this.doadores = todos_doadores
        this.backup = todos_doadores
        let link = 'data:text/csv;charset=utf-8,'
        link += this.doadores.map( dc => Object.values(dc).join(';')+'%0A' )
        this.link = link
    }
}
