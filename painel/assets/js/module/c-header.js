import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: `
    <div class="a-header">
        <div @click="toggle()"> <img src="./assets/icon/menu.svg"> </div>
        <div> <img src="./assets/logo/logo.svg"> </div>
        <strong> Código {{id}} - {{institution_name}} </strong>
        
        <img @click="toggle_pop" src="./assets/icon/change.svg">

        <div class="popupo-bg" v-if="status_pop">
            <div>
                <div @click="toggle_pop" class="pop-close">X</div>
                <input @input="updade_pop" v-model="search" type="text" placeholder="Buscar...">
                <div v-for="item in resumo" class="iten-lista-pop">
                    <div> <b>Código<b> {{item.id}} - {{item.subdominio}} </div>
                    <img @click="change_domain(item.id)" :title="item.id" src="./assets/icon/change.svg">
                </div>
                <div class="pop-center">
                    Total <b> {{ total }} </b>
                </div>
            </div>
        </div>

    </div>
    `,
    data: function() {
        return {
            Super,
            cache,
            status: true,
            total: 0,
            id: 0,
            instituicoes: [],
            institution_name: "Todos",
            resumo: [],
            status_pop: false,
            search: "",
        }
    },
    methods: {
        toggle() {
            this.status = !this.status
            this.$eventHub.$emit('toggle-menu', this.status )
        },
        updade_pop() {
            let list_term = this.instituicoes.map( post => {
                    post.terms = `@ ${post.dominio} - ${post.subdominio}`
                    return post
                } )
            let searching = list_term.filter( post => post.terms.indexOf(this.search) > 0 )
            this.resumo = searching.splice(0, 3)
            if( this.search.length == 0 ) {
                this.resumo = Array.from(this.instituicoes).splice(0, 3)
            }
        },
        toggle_pop() {
            this.status_pop = !this.status_pop
        },
        change_domain(id) {
            localStorage.setItem('institution', id)
            location.reload()
        }
    },
    emits: ['toggle-menu'],
    async mounted() {
        let todas_intituicoes = await this.Super.all_institution()
        this.id = this.cache.institution
        this.instituicoes = todas_intituicoes.data
        this.total = todas_intituicoes.total
        this.resumo = Array.from(this.instituicoes).splice(0, 3)
        this.institution_name = this.instituicoes.find( post => {
            return post.id == localStorage.getItem('institution') 
        })?.subdominio || 'Todos'
    }
}