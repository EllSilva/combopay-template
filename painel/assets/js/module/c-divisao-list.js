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
                        Divisão
                        <a href="#/divisao-novo" class="plus"> 
                            <img src="./assets/icon/plus.svg"> 
                        </a> 
                    </h1>
                    <div class="table">
                        <div v-for="post in playload">
                            <span><b>Recebedor ID:</b> {{ post.recebedor_id || '' }}</span>
                            <span>{{ post.porcetagem }}%</span>
                            <span>
                                <a :href="'#/divisao-editar/'+post.id" class="table_btn">
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
        let all = (await this.Super.split_all()).data
        this.playload = all.filter( i => i.instituicao_id == this.cache.institution)
        this.playload = all
        // this.playload = (await this.Super.split_get_by_institution(this.cache.institution)).data || []
    },
    methods: {
        async del( id ) {
            this.loading = true
            await this.Super.split_del(id)
            this.loading = false
        }
    }
}