import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: `
        <div class="l-admin">
            <c-aside></c-aside>
            <c-header></c-header>
            <div class="a-body">
                <c-step></c-step>
                <div class="body_box">
                    <h1 class="title_form">
                        Cupom
                        <a href="#/cupom/novo" class="plus"> 
                            <img src="./assets/icon/plus.svg"> 
                        </a> 
                    </h1>
                    <div class="table">
                        <div v-for="post in playload" v-if="post.ativo == 1">
                            <span>{{ post.name }}</span>
                            <span>{{ post.code }}</span>
                            <span>R\${{ post.discout }}</span>
                            <span>
                                <a :href="'#/cupom-editar/'+post.id" class="table_btn">
                                    <img src="./assets/icon/edit.svg">
                                    <span>EDITAR</span>
                                </a>
                            </span>
                            <span>
                                <a @dblclick="del(post.id)" class="table_btn table_btn--trash" title="Para acabar use duplo click">
                                    <img src="./assets/icon/trash.svg">
                                </a>
                            </span>
                        </div>                        
                    </div>
                </div>
            </div>
            <div class="loading" v-if="loading"></div>
            <c-footer></c-footer>
        </div>    
    `,
    data: function () {
        return {
            Super,
            cache,
            id: null,
            loading: false,
            playload: [],
           
        }
    },
    async mounted() {
        let all_flags = await this.Super.flag_get_by_institution(this.cache.institution)
        let flag = all_flags.reverse().find(post => post.flag == 'CUPOM')
        this.playload = JSON.parse( atob( flag.base64 ) )
        this.id = flag.id
    },
    methods: {
        async del( id ) {
            this.loading = true
            this.playload = this.playload.map( post => { 
                if(post.id == id) {
                    post.ativo = false
                }
                return post                 
            })
            let playload = {
                base64: btoa( JSON.stringify( this.playload )),
                flag: 'CUPOM',
                instituicao_id: this.cache.institution
            }
            await this.Super.flag_put(this.id, playload)
            this.loading = false
        }
    }
}