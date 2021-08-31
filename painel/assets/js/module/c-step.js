import step from "../data/step.js"

export default {
    template: `
        <div class="body_box" v-if="credencial < 22 && credencial != 20">
            <div class="step-grid">
                <div class="corte" style="background-image: linear-gradient(45deg , blue, #1679bd">
                    <img :src="'./assets/step/'+(icone||'parabens.png')">
                    <img class="item-corte" src="./assets/step/corte.svg">
                </div>
                <div>
                    <h2>{{title}}</h2>
                    <p>{{description}}</p>
                    <a :href="link">{{link_text}}</a>
                </div>
            </div>
            <div class="all-step">
                <div v-for="(pass, i ) in step" :class="{active: i < corruente_step}">
                    <img :src=" i < corruente_step ? './assets/step/icone-concluido.svg' : './assets/step/icone-aguardando.svg'">
                    <span>{{pass.title}}  </span>
                </div>
            </div>
        </div>    
    `,
    data: function () {
        return {
           step,
           corruente_step: 0,
           icone: null,
           title: null,
           description: null,
           link: null,
           link_text: null,
           credencial: 21,
        }
    }, 
    methods: {
        load_step() {
            let step = this.step[this.corruente_step]
            this.icone = step.icon
            this.title = step.title
            this.description = step.description
            this.link = step.link
            this.link_text = step.btn_text
        },
        is_step() {            
            switch (this.credencial) {
                case "21":
                    this.corruente_step = 1
                    break;            
                case "16":
                    this.corruente_step = 2
                    break;            
                case "17":
                    this.corruente_step = 3
                    break;            
                case "18":
                    this.corruente_step = 4
                    break;            
                case "19":
                    this.corruente_step = 5
                    break;                
                
                default:
                    this.corruente_step = 0
                    break;
            }
        }
    },
    async mounted() {
        this.credencial = localStorage.getItem('user_logged_credential_id')
        this.corruente_step = localStorage.getItem('corruente_step') || 0
        this.is_step()
        this.load_step()
    }
}