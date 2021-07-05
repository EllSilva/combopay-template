import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: `
    <div class="a-header">
        <div @click="toggle()"> <img src="./assets/icon/menu.svg"> </div>
        <div> <img src="./assets/logo/logo.svg"> </div>
        <select v-model="id" id="on-instituicao">
            <option :value="com.id" v-for="com in instituicoes">{{ com.nome_fantasia }}</option>
        </select>
        <label for="on-instituicao">
            <img src="./assets/icon/search.svg">
        </label>
    </div>
    `,
    data: function() {
        return {
            Super,
            cache,
            status: false,
            id: 0,
            instituicoes: []
        }
    },
    methods: {
        toggle() {
            this.status = !this.status
            this.$eventHub.$emit('toggle-menu', this.status )
        }
    },
    emits: ['toggle-menu'],
    async mounted() {
        let todas_intituicoes = await this.Super.all_institution()
        this.id = this.cache.institution
        this.instituicoes = todas_intituicoes.data
    }
}