import menus from '../data/menu.js'
import App from '../library/superApp.js'
const Super = new App
export default {
    template: "#c-credenciais",
    data: function () {
        return {
            Super,
            loading: false,
            step: 1,
            steps: [],
            credenciais: [],
            menus: menus
        }
    },
    filters: {
        get_name_by_id(id) {
            let permissao = menus.find(post => post.id == id)
            return permissao?.text
        }
    },
    async mounted() {
        this.load(this.$route.params.step)
    },
    methods: {
        async load(id) {
            let res = await this.Super.all_credential(id)
            this.credenciais = res?.data || []
            this.steps = []
            let total_pages = Math.ceil(res.total / res.per_page)
            for (let index = 0; index < total_pages; index++) {
                this.steps.push(index)
            }
        },
        async apagar(id) {
            this.loading = true
            await this.Super.put_credential(id, { ativo: false })
            this.loading = false
        }
    }
}