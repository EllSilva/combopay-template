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
                        <div v-for="user in playload" v-if="user.ativo == 1">
                            <span><img class="gravatar" src="./assets/img/gravatar.png"></span>
                            <span>{{ user.nome }}</span>
                            <span>{{ user.telefone }}</span>
                            <span>{{ user.email }}</span>
                            <span>
                                <a :href="'#/usuarios/novo/'+user.id" class="table_btn">
                                    <img src="./assets/icon/edit.svg">
                                    <span>EDITAR</span>
                                </a>
                            </span>
                            <span>
                                <a @dblclick="del(user.id)" class="table_btn table_btn--trash" title="Para acabar use duplo click">
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
            loading: false,
            playload: [],
           
        }
    },
    async mounted() {
        let all_flags = await this.Super.flag_get_by_institution(this.cache.institution)
        let flag = all_flags.find(post => post.flag == 'CUPOM')
        this.playload = JSON.parse( atob( flag.base64 ) )
    },
    methods: {
        async del( id ) {
            this.loading = true
            // this.usuarios = this.usuarios.map( user => { 
            //     if(user.id == id) {
            //         user.ativo = 0
            //     }
            //     return user                 
            // })
            // this.usuarios = this.usuarios.filter( user => user.ativo == 1 )
            // await this.Super.status_admin( id, 0 )
            this.loading = false
        }
    }
}