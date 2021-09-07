import App from '../library/superApp.js'
import cache from '../library/cache.js'

const Super = new App

import money from "../mask/money.js"
export default {
    template: `
    <div class="l-admin">
        <c-aside></c-aside>
        <c-header></c-header>
        <div>
            <c-step></c-step>
            <div class="a-body padding-20">
                <div class="g g-3 s-g-1">
                    <div class="resumo" v-for="item in saldo" >
                        <div :style="{backgroundColor: item.color}">
                            <img :src="'./assets/icon/'+item.ico">
                        </div>
                        <span>
                            <small>{{item.label}}</small>
                            <b>R\${{item.valor|money}}</b>
                        </span>
                        <span>{{item.estimativa}}</span>
                    </div>
                </div>
                <div class="space"></div>
                <div class="g g-2 s-g-1">
                    <div class="body_box form" style="margin:0">
                        <h2>Solicitar Saque</h2>
                        <input type="radio" value="total" v-model="tipo" name="tipo">
                        Valor Total
                        <input type="radio" value="parcial" v-model="tipo" name="tipo">
                        Valor Parcial
                        <input v-if="tipo != 'total'" type="text" v-model="valor">
                        <button type="submit" class="btn btn--success">Solicitar Saque</button>
                    </div>
                    <div class="body_box" style="margin:0">
                        <h2>Histórico</h2>
                        <div class="historico">
                            <span v-for="(post, i) in extrato" :class="post.status" v-if=" i < 3 || view_all ">
                                <b>{{post.type|traduz}}</b> <br>
                                R\${{post.amount | money}} <br>
                                {{post.date_created | date }}
                            </span>
                        </div>
                        <center>
                            <span @click="mostrar">
                            {{ view_all ? 'Minimizar' : 'Mostrar Todas' }}
                            </span>
                        </center>
                    </div>
                </div>
            </div>
        </div>
        <c-footer></c-footer>
        <div class="loading" v-if="loading"></div>
    </div>
    `,
    data: function () {
        return {
            Super,
            cache,
            loading: false,
            money,
            tipo: "total",
            valor: 0,
            view_all: false,
            saldo: [
                {
                    color: "#6699df",
                    ico: "metas.svg",
                    id: "available",
                    label: "Saldo Liberado",
                    valor: 0,
                    estimativa: "",
                    
                },
                {
                    color: "#c04943",
                    ico: "metas.svg",
                    id: "waiting_funds",
                    label: "Saldo á liberar",
                    valor: 0,
                    estimativa: "",
                },
                {
                    color: "#b9a025",
                    ico: "metas.svg",
                    id: "transferred",
                    label: "Total Retirado",
                    valor: 0,
                    estimativa: "",
                }
            ],
            extrato: [],
        }
    },
    filters: {
        money: (v) => money( `${v}` ),
        date: v => v.substr(0, 10).split('-').reverse().join('/'),
        traduz: text => {
            let lib = {
                payable: 'Pago'
            }
            return lib[text] || text
        }
    },
    async mounted() {
        let instituicao = await this.Super.get_institution(this.cache.institution)
        let saldo = await this.Super.institution_saldo(instituicao.recebedor_id)
        let saques = await this.Super.institution_saques(instituicao.recebedor_id)
        this.extrato = saques      

        this.saldo[0].valor = saldo.disponivel
        this.saldo[1].valor = saldo.fundos_espera
        this.saldo[2].valor = saldo.transferidos_para_conta
    },
    methods: {
        mostrar() {
            this.view_all = !this.view_all
        }
    }
}