import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App

export default {
    template: "#c-doadores",
    data: function () {
        return {
            cache,
            Super,
            link: '',
            backup: [],
            s: "",
            doadores: [],
            recorrentes: [],
            recorrente: 1,
            ids: [],
            periodo: 1,
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
        
        all_doacoes.forEach( doacao => {           
            if(doacao?.plano_id) {
                this.recorrentes.push( parseInt( doacao?.doador_id ))
            }
        })

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
        
        todos_doadores = todos_doadores.map( doador => {
            doador.filter_data = Date.parse(doador.created_at)
            doador.recorrente = this.recorrentes.includes(doador.id ) 
            return doador
        } )


       

        
        // let res = (await this.Super.all_doadores_by_istitution(this.cache.institution)).reverse()
        todos_doadores = todos_doadores.reverse()

        globalThis._doadores = todos_doadores
        this.doadores = todos_doadores
        this.backup = todos_doadores
        let link = 'data:text/csv;charset=utf-8,'
        link += this.doadores.map( dc => Object.values(dc).join(';')+'%0A' )
        this.link = link

    },
    methods: {
        select_data() {
            var render_days = new Date(new Date().getTime() - (this.periodo * 24 * 60 * 60 * 1000));
            this.doadores = this.backup.filter( doador => doador.filter_data >= render_days.getTime())
        },
        de() {
            let data_min = Date.parse(this.data_min)
            this.doadores = this.backup.filter( doador => doador.filter_data >= data_min)
        },
        ate() {
            let data_min = Date.parse(this.data_min)
            let data_max = Date.parse(this.data_max)
            this.doadores = this.backup.filter( doador => doador.filter_data >= data_min && doador.filter_data <= data_max )
        },
        search() {
            this.doadores = this.backup.filter( doador => {
                let termo = "@@"
                termo += doador.cpf
                termo += doador.email
                termo += doador.nome
                termo += doador.sobrenome
                return termo.indexOf(this.s) > 1
            })
            if( this.s.length == 0 ) {
                this.doadores = this.backup
            }
        },
        reco() {
            this.doadores = this.backup.filter( doador => this.recorrentes.includes( doador.id ) == this.recorrente  )
        }
    }
}
