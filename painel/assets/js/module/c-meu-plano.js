import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-meu-plano",
    data: function () {
        return {
            Super,
            cache,
            cpf: null,
            id: null,
            nome: null,
            email: null,
            telefone: null,
            senha: '',
            print_valor: "29.90",
            plano_id: "1386032",
            confirmar_senha: '',
            messageAlterPass: {
                status: false,
                text: null
            },
            loading: false,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            },
            error2: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            },
            planos: [
                { preco: 29.90, id: "1386032", instancias: 1 },
                { preco: 80.73, id: "1386052", instancias: 3 },
                { preco: 152.49, id: "1386056", instancias: 6 },
                { preco: 220.66, id: "1386057", instancias: 9 },
                { preco: 279.86, id: "1386058", instancias: 12 },
                { preco: 336.37, id: "1386059", instancias: 15 },
            ],
            cupon: [
                { code: "#ANJODIGITAL", trial: 30, preco: 29.90, id: "1386061", instancias: 1 },
                { code: "#ANJODIGITAL", trial: 30, preco: 80.73, id: "1386062", instancias: 3 },
                { code: "#ANJODIGITAL", trial: 30, preco: 152.49, id: "1386064", instancias: 6 },
                { code: "#ANJODIGITAL", trial: 30, preco: 220.66, id: "1386065", instancias: 9 },
                { code: "#ANJODIGITAL", trial: 30, preco: 279.86, id: "1386066", instancias: 12 },
                { code: "#ANJODIGITAL", trial: 30, preco: 336.37, id: "1386067", instancias: 15 },
            ],
            // re_ckq9yr3cf1ign0h9t8bi414jh
            doacao: {
                plan_id: null,
                recorrente: 1,
                amount: '5000',
                amount_custon: 0,
                nome: 'Bruno',
                sobrenome: 'Vieira',
                dataNascimento: '1987-09-18',
                email: 'br.rafael@outlook.com',
                telefone: '11999998888',
                cpf: '76537741807',
                cep: '06786270',
                rua: '',
                numero: '45',
                bairro: '',
                estado: '',
                cidade: '',
                card: "4111111111111111",
                validade: "0922",
                cvv: "123",
                nome_card: "Morpheus Fishburne",
                payment_type: 'card',
                complemento: 'nao definido',
                cupom: "#ANJODIGITAL"
            },
            trial: {
                status: false,
                plan_id: null
            }
        }
    },
    watch: {
        plano_id(x, y ) { this.valor() }
    },
    methods: {
        cupom() {
            let code = "#ANJODIGITAL"
            if( this.doacao.cupom.replace(' ', '') == code ) {
                this.trial.status = true
                this.trial.plan_id = 1
                let plano_escolhido = this.planos.find( p => p.id == this.plano_id )
                let plano_cupom = this.cupon.find( p => p.instancias == plano_escolhido.instancias )
                console.log( plano_cupom )
                this.trial.plan_id = plano_cupom.id
            }else {
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
        valor() {
            this.plano_id
            console.log('ok')
        },
        async alterar_senha() {
            this.loading = true
            this.messageAlterPass.status = false
            if (this.senha != this.confirmar_senha) {
                this.messageAlterPass.status = true
                this.messageAlterPass.text = 'As senhão estão diferentes'
                this.loading = false
                return
            }
            if (this.senha.length < 6) {
                this.messageAlterPass.status = true
                this.messageAlterPass.text = 'A senha deve ter no minimo 6 caracteres'
                this.loading = false
                return
            }
            let res = await this.Super.alterar_senha(this.id, this.senha)
            this.error2.status = true
            this.error2.text = res.message
            this.error2.type = res.status
            this.loading = false
        },
        async atualizar() {
            this.loading = true
            let res = await this.Super.put_admin(this.id, {
                email: this.email,
                telefone: this.telefone,
                nome: this.nome
            })
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false
        },
        async contratar_plano() {
            let playload = {
                plano_id: this.plano_id,
                quantia: this.planos.find( p => p.id == this.plano_id).preco.replace('.', ''),
                metodo: "cartao_credito",
                instituicao_id: 're_ckq9yr3cf1ign0h9t8bi414jh',
                doador_id: Date.now(),
                cliente: {
                    nome: this.doacao.nome_card,
                    cpf: this.cpf,
                    email: this.email,
                    telefone:'%2B55'+this.telefone 
                },
                cartao_credito: {
                    nome: this.doacao.nome_card,
                    cvv: this.doacao.cvv,
                    numero: this.doacao.card,
                    expericao: this.doacao.validade
                },
                items: {
                    id: "1",
                    nome: "Plano " . this.planos.find( p => p.id == this.plano_id).instancias,
                    preco_unico: this.planos.find( p => p.id == this.plano_id).preco.replace('.', ''),
                    quantidade: 1
                }
            }
            if(this.trial.status) {
                playload.plano_id = this.trial.plan_id
                let res = await this.Super.payPlan(playload)
            }else{
                let res = await this.Super.payPlan(playload)
            }
            
            
        }
    },
    filters: {
        money: val => val.toLocaleString('en-US', { style: 'currency', currency: 'BRL', }),        

    },
    async created() {
        
        let res = await this.Super.get_admin(this.cache.user_logged_id)
        this.id = res.id
        this.nome = res.nome
        this.email = res.email
        this.telefone = res.telefone


    }
}

