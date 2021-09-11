import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-meu-plano",
    data: function () {
        return {
            Super,
            cache,
            user: null,
            loading: false,
            credencial: 0,
            plano_id: "626754",
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            },
            planos: [
                { preco: 4.00, id: "626754", instancias: 1 },
                { preco: 56.81, id: "1396159", instancias: 2 },
                { preco: 80.73, id: "1386052", instancias: 3 },
                { preco: 152.49, id: "1386056", instancias: 6 },
                { preco: 220.66, id: "1386057", instancias: 9 },
                { preco: 279.86, id: "1386058", instancias: 12 },
                { preco: 336.37, id: "1386059", instancias: 15 },
            ],
            cupon: [
                { code: "#ANJODIGITAL", trial: 30, preco: 4.00, id: "626754", instancias: 1 },
                { code: "#ANJODIGITAL", trial: 30, preco: 56.81, id: "1396162", instancias: 2 },
                { code: "#ANJODIGITAL", trial: 30, preco: 80.73, id: "1386062", instancias: 3 },
                { code: "#ANJODIGITAL", trial: 30, preco: 152.49, id: "1386064", instancias: 6 },
                { code: "#ANJODIGITAL", trial: 30, preco: 220.66, id: "1386065", instancias: 9 },
                { code: "#ANJODIGITAL", trial: 30, preco: 279.86, id: "1386066", instancias: 12 },
                { code: "#ANJODIGITAL", trial: 30, preco: 336.37, id: "1386067", instancias: 15 },
            ],
            doacao: {
                plan_id: null,
                amount: '400',
                card: "",
                validade: "",
                cvv: "",
                nome_card: "",
                payment_type: 'card',
                cupom: ""
            },
            trial: {
                status: false,
                plan_id: null
            }
        }
    },
    watch: {
        plano_id(x, y) { this.valor() }
    },
    methods: {
        valor() {},
        cupom() {
            let code = "#ANJODIGITAL"
            if (this.doacao.cupom.replace(' ', '') == code) {
                this.trial.status = true
                this.trial.plan_id = 1
                this.trial.plan_id = this.cupon[0].id
                this.plano_id = this.planos[0].id
            } else {
                this.trial.plan_id = null
                this.trial.status = false
            }
        },
        mask_validade() {
            let mascara = this.doacao.validade
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{2})(\d{2,4})(.*)/gi, '$1/$2')
            if (mascara.length > 0) {
                this.doacao.validade = mascara
            } else {
                this.doacao.validade = "02/2020"
            }
        },
        mask_cvv() {
            let mascara = this.doacao.cvv
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{3})(.*)/gi, '$1')
            this.doacao.cvv = mascara

        },
        mask_card() {
            let mascara = this.doacao.card
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{4})(.*)/gi, '$1 $2')
            mascara = mascara.replace(/(\d{4}\s)(\d{4})(.*)/gi, '$1$2 $3')
            mascara = mascara.replace(/(\d{4}\s)(\d{4}\s)(\d{4})(.*)/gi, '$1$2$3 $4')
            mascara = mascara.replace(/(\d{4}\s)(\d{4}\s)(\d{4}\s)(\d{4})(.*)/gi, '$1$2$3$4')
            this.doacao.card = mascara
        },
        async contratar_plano() {

            this.loading = true

            let valor = this.planos.find(p => p.id == this.plano_id).preco.toFixed(2).toString().replace('.', '')
            let instacia_total = this.planos.find(p => p.id == this.plano_id).instancias

            let playload = {
                doador_id: "",
                metodo: "credit_card",
                instituicao_id: 1,
                // instituicao_id: 're_ckq9yr3cf1ign0h9t8bi414jh',
                plano_id: this.plano_id,
                // plano_id: 614822,
                quantia: valor,
                valor_plano: valor,
                cliente: {
                    nome: this.user.nome,
                    cpf: this.user.cpf.replace(/\D/ig, ''),
                    email: this.user.email,
                    dataNascimento: this.user.dataNascimento,
                    sexo: "masculino",
                    telefone: this.user.telefone.replace(/\D/ig, '').substr(2, 10),
                    ddd: this.user.telefone.replace(/\D/ig, '').substr(0, 2),
                },
                endereco: {
                    cep: this.user.cep,
                    rua: this.user.rua,
                    numero: this.user.numero,
                    bairro: this.user.bairro,
                    complemento: this.user.complemento,
                    cidade: this.user.cidade,
                    estado: this.user.estado,
                },
                cartao_credito: {
                    nome: this.doacao.nome_card,
                    cvv: this.doacao.cvv.replace(/\D/ig, ''),
                    numero: this.doacao.card.replace(/\D/ig, ''),
                    expiracao: this.doacao.validade.replace(/\D/ig, ''),
                }
            }   
            
            // Aqui gente verifica se esta no plano
            if( this.doacao.cupom == "#ANJODIGITAL" ) {
                playload.plano_id = 626754
                playload.quantia = 4.0
                playload.valor_plano = 4.0
            }

            let res = await this.Super.payPlan(playload)
            this.loading = false

            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status

            if( res.status != "success" ) {                
                return
            }

            if( this.user?.credencial == 21 ) {
                window.location.href = '#/minhas-instituicoes/1'
                localStorage.setItem('user_logged_credential_id', 16)
                await this.Super.put_admin(this.user.id, {
                    credencial: 16
                }) 
            } 

        }
    },
    filters: {
        money: val => val.toLocaleString('en-US', { style: 'currency', currency: 'BRL', }),
    },
    async created() {
        this.credencial = localStorage.getItem('user_logged_credential_id')
        this.user = await this.Super.get_admin(this.cache.user_logged_id)

    }
}

