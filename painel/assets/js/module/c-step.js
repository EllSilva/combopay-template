import step from "../data/step.js"

export default {
    template: `
        <div class="body_box" v-if="corruente_step < step.length">
            <div class="step-grid">
                <div class="corte" style="background-color: #002bbe">
                    <img :src="'./assets/step/'+icone">
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
        }
    },
    async mounted() {
        this.corruente_step = localStorage.getItem('corruente_step') || 0
        this.load_step()
    }
}