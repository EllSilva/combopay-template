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
                <div class="g g-3">
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
                <div class="g g-2">
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
                            <span v-for="post in extrato" :class="post.status">
                                <b>{{post.type}}</b> <br>
                                R\${{post.amount | money}} <br>
                                {{post.date_created | date }}
                            </span>
                        </div>
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
            saldo: [
                {
                    color: "#6699df",
                    ico: "metas.svg",
                    id: "available",
                    label: "Saldo Liberado",
                    valor: 3019898,
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
                    valor: 3163500,
                    estimativa: "",
                }
            ],
            extrato: [
                {
                    "object": "balance_operation",
                    "id": 2499850,
                    "status": "available",
                    "type": "payable",
                    "amount": 100000,
                    "fee": 115,
                    "date_created": "2017-08-03T18:20:54.464Z",
                    "movement_object": {
                        "object": "payable",
                        "id": 1966396,
                        "status": "paid",
                        "amount": 100000,
                        "fee": 115,
                        "anticipation_fee": 0,
                        "installment": 1,
                        "transaction_id": 1785151,
                        "split_rule_id": "sr_cj5tws6kk001oij6d6lw8mmi1",
                        "bulk_anticipation_id": null,
                        "recipient_id": "re_cj5idth9i00lc8c6elboaxyhs",
                        "payment_date": "2017-09-03T03:00:00.000Z",
                        "original_payment_date": null,
                        "type": "refund",
                        "payment_method": "credit_card",
                        "accrual_date": null,
                        "date_created": "2017-07-03T18:20:54.457Z"
                    }
                }, {
                    "object": "balance_operation",
                    "id": 2499858,
                    "status": "available",
                    "type": "payable",
                    "amount": 10000,
                    "fee": 115,
                    "date_created": "2017-08-03T18:20:54.464Z",
                    "movement_object": {
                        "object": "payable",
                        "id": 1636196,
                        "status": "paid",
                        "amount": 10000,
                        "fee": 115,
                        "anticipation_fee": 0,
                        "installment": 1,
                        "transaction_id": 1785148,
                        "split_rule_id": null,
                        "bulk_anticipation_id": null,
                        "recipient_id": "re_cj5idth9i00lcer5elboaxyhs",
                        "payment_date": "2017-05-03T03:00:00.000Z",
                        "original_payment_date": null,
                        "type": "credit",
                        "payment_method": "credit_card",
                        "accrual_date": null,
                        "date_created": "2017-03-03T18:20:54.457Z"
                    }
                }, {
                    "object": "balance_operation",
                    "id": 2499868,
                    "status": "available",
                    "type": "payable",
                    "amount": 30000,
                    "fee": 115,
                    "date_created": "2017-08-03T18:20:54.464Z",
                    "movement_object": {
                        "object": "payable",
                        "id": 1966185,
                        "status": "paid",
                        "amount": 30000,
                        "fee": 115,
                        "anticipation_fee": 0,
                        "installment": 3,
                        "transaction_id": 1785141,
                        "split_rule_id": null,
                        "bulk_anticipation_id": null,
                        "recipient_id": "re_cj5idth9i00lc8c6elbeiayhs",
                        "payment_date": "2017-03-03T03:00:00.000Z",
                        "original_payment_date": null,
                        "type": "refund",
                        "payment_method": "credit_card",
                        "accrual_date": null,
                        "date_created": "2017-04-03T18:20:54.457Z"
                    }
                }
            ],
        }
    },
    filters: {
        money: (v) => money( `${v}` ),
        date: v => v.substr(0, 10).split('-').reverse().join('/')
    },
    async mounted() {
        let instituicao = await this.Super.get_institution(this.cache.institution)
        let saldo = await this.Super.institution_saldo(instituicao.recebedor_id)
        let historico = await this.Super.institution_historico(instituicao.recebedor_id)
        
        console.log(historico)

        this.saldo[0].valor = saldo.disponivel
        this.saldo[1].valor = saldo.fundos_espera
        this.saldo[2].valor = saldo.transferidos_para_conta
    },
    methods: {
    }
}