import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
// %0A
export default {
    template: "#c-inicio",
    data: function () {
        return {
            Super,
            cache,
            Chart,
            link: 'data:text/csv;charset=utf-8,',
            loading: false,
            resumos: [],
            doador_unico: [],
            doador_recorrente: [],
            total: 0,


            doacoes: [],
            backup: [],
            periodo: 0,
            data_min: null,
            data_max: null,
        }
    },
    async mounted() {
        let all_doadores = await this.Super.all_doadores_by_istitution(this.cache.institution)
        let res = await this.Super.all_doacao_by_institution(this.cache.institution)
        this.total = res.length
        

        res = res.map( d => {
            d.filter_data = Date.parse(d.created_at)           
            return d
        })

        this.doacoes = [...res]
        this.backup = [...res]

        this.render()

        

        

    },
    filters: {
        money: val => (val/100).toLocaleString('pt-br', { minimumFractionDigits: 2 })
    },
    methods: {
        graph(el, data) {
            var ctx = this.$refs[el].getContext('2d');
            var myChart = new Chart(ctx, data);
        },
        select_data() {
            var render_days = new Date(new Date().getTime() - (this.periodo * 24 * 60 * 60 * 1000));
            this.doacoes = this.backup.filter(doador => doador.filter_data >= render_days.getTime())
            this.render()
        },
        de() {
            let data_min = Date.parse(this.data_min)
            this.doacoes = this.backup.filter(doador => doador.filter_data >= data_min)
            this.render()
        },
        ate() {
            let data_min = Date.parse(this.data_min)
            let data_max = Date.parse(this.data_max)
            this.doacoes = this.backup.filter(doador => doador.filter_data >= data_min && doador.filter_data <= data_max)
            this.render()
        },
        faturamento(doacoes, metas) {
            metas =  metas.map( m => parseInt(m.replace('.','').replace(',','')) / 100 )
            let total_arrecadado = Array(12).fill(0)
            let total_pagos = Array(12).fill(0)
            let total_aberto = Array(12).fill(0)
            doacoes.forEach( d=>  {
                let indice = parseInt( d.created_at.substr(5,2) )
                let valor = parseInt( d.quantia || d.valor_plano )
                total_arrecadado[indice] += valor / 100

                if(d.status == 'paid') {
                    total_pagos[indice] += valor / 100
                }                
                
                if(d.status == "waiting_payment") {
                    total_aberto[indice] += valor / 100
                }

            } )
            this.graph('graph_faturas', {
                type: 'bar',
				data: {
					labels:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
					datasets: [
					{
						label:'Meta',
						data:metas,
						borderColor: '#B002BC',
						borderWidth: 3,
						type: 'line'
					},
					{
						label:'Total Arrecadado',
						data:total_arrecadado,
						backgroundColor: '#4791FF',
						borderColor: '#4791FF',
						borderWidth: 3
					},
					{
						label:'Total Pago',
						data: total_pagos,
						backgroundColor: '#02BC77',
						borderColor: '#02BC77',
						borderWidth: 3
					},
					{
						label:'Total Aberto',
						data: total_aberto, 
						backgroundColor: '#FFD950',
						borderColor: '#FFD950',
						borderWidth: 3


					}
					]
                },              
            })
        },
        async render() {
            let allflags = []
            let metas = []
            allflags = (await this.Super.flag_get_by_institution(this.cache.institution)).reverse()
            metas = allflags.find(post => post.flag == 'METAS_2021').base64
            metas = atob(metas)
            metas = JSON.parse(metas)
            this.doacoes.forEach( doacao => { 
                let doador_id = parseInt( doacao?.doador_id )
                if(doacao?.plano_id) {
                    if(!this.doador_recorrente.includes(doador_id)) {
                        this.doador_recorrente.push( doador_id )
                    }
                }
            })
            this.doacoes.forEach( doacao => { 
                let doador_id = parseInt( doacao?.doador_id )
                if(!doacao?.plano_id) {
                    if(!this.doador_recorrente.includes(doador_id)) {
                        if(!this.doador_unico.includes(doador_id)) {
                            this.doador_unico.push( doador_id )
                        }
                    }                
                }
            })

            let doacoes_em_aberto = this.doacoes.reduce( (acc, doacao) => {
                if(doacao.status == "waiting_payment") {
                    acc += (doacao.quantia || doacao.valor_plano)  / 100
                }
                return acc
            }, 0 )
            
            let total_doacoes = this.doacoes.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            let total_docacao = total_doacoes.length
            total_doacoes = total_doacoes.map(doacao => !doacao ? 0 : doacao)
    
            total_doacoes = total_doacoes.reduce((valor, acc) => acc + valor, 0)
    
            let doacoes_pagas = this.doacoes.filter(doacao => doacao.status == "paid")
            let total_pagas = doacoes_pagas.length
            doacoes_pagas = doacoes_pagas.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_pagas = doacoes_pagas.map(doacao => !doacao ? 0 : doacao)
            doacoes_pagas = doacoes_pagas.reduce((valor, acc) => acc + valor, 0)
    
            let doacoes_canceladas = this.doacoes.filter(doacao => doacao.status == "canceled")
            let total_cancelada = doacoes_canceladas.length
            doacoes_canceladas = doacoes_canceladas.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_canceladas = doacoes_canceladas.map(doacao => !doacao ? 0 : doacao)
            doacoes_canceladas = doacoes_canceladas.reduce((valor, acc) => acc + valor, 0)
    
            let doacoes_boletos = this.doacoes.filter(doacao => doacao.tipo == "boleto" && doacao.status != "paid" )
            doacoes_boletos = doacoes_boletos.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_boletos = doacoes_boletos.map(doacao => !doacao ? 0 : doacao)
            doacoes_boletos = doacoes_boletos.reduce((valor, acc) => acc + valor, 0)        
    
            let doacoes_boletos_pago = this.doacoes.filter(doacao => doacao.tipo == "boleto" && doacao.status == "paid" )
            doacoes_boletos_pago = doacoes_boletos_pago.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_boletos_pago = doacoes_boletos_pago.map(doacao => !doacao ? 0 : doacao)
            doacoes_boletos_pago = doacoes_boletos_pago.reduce((valor, acc) => acc + valor, 0)
    
    
    
            let doacoes_card = this.doacoes.filter(doacao => doacao.tipo == "cartao_credito" && doacao.status != "paid")
            doacoes_card = doacoes_card.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_card = doacoes_card.map(doacao => !doacao ? 0 : doacao)
            doacoes_card = doacoes_card.reduce((valor, acc) => acc + valor, 0)
    
            let doacoes_card_pago = this.doacoes.filter(doacao => doacao.tipo == "cartao_credito" && doacao.status == "paid")
            doacoes_card_pago = doacoes_card_pago.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_card_pago = doacoes_card_pago.map(doacao => !doacao ? 0 : doacao)
            doacoes_card_pago = doacoes_card_pago.reduce((valor, acc) => acc + valor, 0)
    
            let doacoes_pix = this.doacoes.filter(doacao => doacao.tipo == "pix" && doacao.status != "paid")
            doacoes_pix = doacoes_pix.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_pix = doacoes_pix.map(doacao => !doacao ? 0 : doacao)
            doacoes_pix = doacoes_pix.reduce((valor, acc) => acc + valor, 0)        
            
            let doacoes_pix_pago = this.doacoes.filter(doacao => doacao.tipo == "pix" && doacao.status == "paid")
            doacoes_pix_pago = doacoes_pix_pago.map(doacao => parseInt(doacao.quantia||doacao.valor_plano))
            doacoes_pix_pago = doacoes_pix_pago.map(doacao => !doacao ? 0 : doacao)
            doacoes_pix_pago = doacoes_pix_pago.reduce((valor, acc) => acc + valor, 0)
    
            let doadores_recorrente = this.doacoes.filter(doacao => doacao.plano_id)
            let total_doadores_recorrente = doadores_recorrente.length
    
            let media_doacao = total_doacoes / total_docacao
    
    
            let labels = this.doacoes.reduce((acc, doacao) => {
                let dia = doacao.updated_at.substr(5, 5)
                acc[dia] = null
                return acc
            }, {})
            labels = Object.keys(labels)
    
            let ganho_dia = this.doacoes.reduce((acc, doacao) => {
                let dia = doacao.updated_at.substr(5, 5)
                acc[dia] = (+acc[dia] || 0) + +doacao.quantia
                return acc
            }, {})
            ganho_dia = Object.values(ganho_dia)
    
            let quantidade_docacao_por_dia = this.doacoes.reduce((acc, doacao) => {
                let dia = doacao.updated_at.substr(5, 5)
                acc[dia] = (+acc[dia] || 0) + 1
                return acc
            }, {})
            quantidade_docacao_por_dia = Object.values(quantidade_docacao_por_dia)
    
            
            let quantidade_pix_por_dia = this.doacoes.reduce((acc, doacao) => {
                let dia = doacao.updated_at.substr(5, 5)
                if( doacao.tipo == "pix" ) {
                    acc[dia] = (+acc[dia] || 0) + 1
                }
                return acc
            }, {})
            quantidade_pix_por_dia = Object.values(quantidade_pix_por_dia)        
            
            let quantidade_card_por_dia = this.doacoes.reduce((acc, doacao) => {
                let dia = doacao.updated_at.substr(5, 5)
                if( doacao.tipo == "cartao_credito" ) {
                    acc[dia] = (+acc[dia] || 0) + 1
                }
                return acc
            }, {})
            quantidade_card_por_dia = Object.values(quantidade_card_por_dia)
    
            let quantidade_boleto_por_dia = this.doacoes.reduce((acc, doacao) => {
                let dia = doacao.updated_at.substr(5, 5)
                if( doacao.tipo == "boleto" ) {
                    acc[dia] = (+acc[dia] || 0) + 1
                }
                return acc
            }, {})
            quantidade_boleto_por_dia = Object.values(quantidade_boleto_por_dia)
    
            let doacoes_aberto = doacoes_em_aberto
    
            this.link += `Total ;${total_doacoes}%0A`
            this.link += `Pagas;${doacoes_pagas}%0A`
            this.link += `Canceladas;${doacoes_canceladas}%0A`
            this.link += `Recorrente;${total_doadores_recorrente}%0A`
            this.link += `Média;${media_doacao}%0A`
            this.link += `Aberto;${doacoes_aberto}%0A`
            this.link += `Boletos;${doacoes_boletos}%0A`
            this.link += `Cartão;${doacoes_card}%0A`
            this.link += `PIX;${doacoes_pix}%0A`
    
            let doador_novo = this.doador_recorrente.length + this.doador_unico.length      
    
            this.resumos = [
                {  tipo: 0, label: "Total Doações", valor: total_doacoes, estimativa: null, ico: "total-doacoes-0984e3.svg", color: "#0984e3" },
                {  tipo: 0, label: "Doações Concluídas", valor: doacoes_pagas, estimativa: null, ico: "doacoes-concluidas-20bf63.svg", color: "#20bf63" },
                {  tipo: 0, label: "Doações em Aberto", valor: doacoes_aberto, estimativa: null, ico: "doacoes-em-aberto-f9d64b.svg", color: "#f9d64b" },
                {  tipo: 0, label: "Doações Vencidas", valor: doacoes_canceladas, estimativa: null, ico: "doacoes-vencidas-ff7675.svg", color: "#ff7675" },
                {  tipo: 0, label: "Doações Boletos Aberto", valor: doacoes_boletos, estimativa: null, ico: "doacoes-boletos-2eccba.svg", color: "#2eccba" },
                {  tipo: 0, label: "Doações Boletos Pago", valor: doacoes_boletos_pago, estimativa: null, ico: "doacoes-boletos-2eccba.svg", color: "#2eccba" },
                {  tipo: 0, label: "Doações Créditos Aberto", valor: doacoes_card, estimativa: null, ico: "doacoes-creditos-249e90.svg", color: "#249e90" },
                {  tipo: 0, label: "Doações Créditos Pago", valor: doacoes_card_pago, estimativa: null, ico: "doacoes-creditos-249e90.svg", color: "#249e90" },
                {  tipo: 0, label: "Doações PIX Aberto", valor: doacoes_pix, estimativa: null, ico: "doacoes-pix-5320bf.svg", color: "#5320bf" },
                {  tipo: 0, label: "Doações PIX Pago", valor: doacoes_pix_pago, estimativa: null, ico: "doacoes-pix-5320bf.svg", color: "#5320bf" },
                {  tipo: 0, label: "Doações Previstas", valor: 0, estimativa: null, ico: "doacoes-previstas-616161.svg", color: "#616161" },
                {  tipo: 1, label: "Novos Doadores", valor: doador_novo, estimativa: null, ico: "novos-doadores-20bf63.svg", color: "#20bf63" },
                {  tipo: 1, label: "Doadores Recorrentes", valor: this.doador_recorrente.length, estimativa: null, ico: "doadores-recorrentes-0984e3.svg", color: "#0984e3" },
                {  tipo: 1, label: "Doadores Únicos", valor: this.doador_unico.length, estimativa: null, ico: "doadores-unicos-7fc1e6.svg", color: "#7fc1e6" },
                {  tipo: 0, label: "Doação Media", valor: media_doacao, estimativa: null, ico: "doacoes-media-2ecc71.svg", color: "#2ecc71" },
                {  tipo: 1, label: "Doadores Adimplentes", valor: 0, estimativa: null, ico: "doadores-adimplentes-20bf63.svg", color: "#20bf63" },
                {  tipo: 1, label: "Doadores Inadimplentes", valor: 0, estimativa: null, ico: "doadores-inadimplentes-ff7675.svg", color: "#ff7675" },
            ]
    
            if( this.total<1 ) {
                return
            }
            
            this.faturamento(this.doacoes, metas)

            // this.graph('graph_faturas', {
            //     type: 'line',
            //     responsive: true,
            //     data: {
            //         labels: labels,
            //         datasets: [
            //             {
            //                 label: "Ganho Dia",
            //                 data: ganho_dia,
            //                 borderColor: "#05f",
            //             }
            //         ]
            //     }
    
            // })

            

           
    
            this.graph('graph_forma_pagamento', {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "PIX",
                            data: quantidade_pix_por_dia,
                            borderColor: "#070",
                        },
                        {
                            label: "Cartão",
                            data: quantidade_card_por_dia,
                            borderColor: "#000",
                        },
                        {
                            label: "Boleto",
                            data: quantidade_boleto_por_dia,
                            borderColor: "#05f",
                        }
                    ]
                }
            })
    
            this.graph('graph_quantidade_doacao', {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Doações Por Dia",
                            data: quantidade_docacao_por_dia,
                            borderColor: "#05f",
                        }
                    ]
                }
            })
    
            this.graph('graph_status_doacao', {
                type: 'pie',
                data: {
                    labels: ['Aberto', 'vencido', 'pago'],
                    datasets: [
                        {
                            data: [(total_docacao - (total_cancelada + total_pagas)), total_cancelada, total_pagas],
                            backgroundColor: ["#f1c40f", "#c0392b", "#27ae60"],
                        }
                    ]
                }
            })
    
            this.graph('graph_tipos_doadores', {
                type: 'pie',
                data: {
                    labels: ['Recorrente', 'Unico'],
                    datasets: [
                        {
                            data: [total_doadores_recorrente, this.doacoes.length - total_doadores_recorrente],
                            backgroundColor: ["#3498db", "#8e44ad"],
                        }
                    ]
                }
            })
    
            this.graph('graph_status_doadores', {
                type: 'pie',
                data: {
                    labels: ['Adinplates', 'Inadinplate'],
                    datasets: [
                        {
                            data: [1, 1],
                            backgroundColor: ["#27ae60", "#e67e22"],
                        }
                    ]
                }
            })
        }
    }
}