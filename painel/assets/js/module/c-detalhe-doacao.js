import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-detalhe-doacao",
    data: function () {
        return {
            Super,
            cache,
            id: null,

            plano_id: null,
            created_at: null,
            doador_id: null,
            id: null,
            nome: null,
            quantia: null,
            status: null,
            tipo: null,
            data_vencimento: null,
            boleto_code: null,
            boleto_link: null,
        }
    },
    filters: {
        money: valor => 'R$' + (valor/100).toLocaleString('pt-br', { minimumFractionDigits: 2 }),
        data: horario => {            
            let data2 = horario?.substr(0,10)?.split('-')?.reverse()?.join('/')
            let hora = horario?.substr(11,5)
            return data2 + ' - ' + hora
        },
        traduz: termo => {
            let lib = {
                waiting_payment: "Pendente",
                refused: "Cancelado",
                paid: "pago",
                credit_card: "Crédito",
                unpaid: "Não Pago"
            }
            return lib[termo] || termo
        }
    },
    methods: {
        copiar( ref ) {
            this.$refs[ref].select(); document.execCommand('copy');
        }
    },
    async mounted() {
        this.id = this.$route.params.id
        if (!globalThis._doacoes) {
            globalThis._doacoes = await this.Super.all_doacao_by_institution(this.cache.institution)
        }
        globalThis._doacoes = Object.values(globalThis._doacoes)
        let doacao = globalThis._doacoes.find(doacao => doacao.id == this.id)

        this.id = doacao.id
        this.plano_id = doacao.plano_id
        this.created_at = doacao.created_at
        this.doador_id = doacao.doador_id
        this.nome = doacao.nome || doacao.nome_doador
        this.quantia = doacao.quantia || doacao.valor_plano || 0
        this.status = doacao.status
        this.tipo = doacao.tipo
        this.boleto_code = doacao?.codigo_barras
        this.boleto_link = doacao?.url        

    }
}

