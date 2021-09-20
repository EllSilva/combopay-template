import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: "#c-perfil",
    data: function () {
        return {
            Super,
            cache,
            id: null,
            nome: null,
            email: null,
            telefone: null,
            senha: '',
            confirmar_senha: '',
            credencial: 15,

            sobrenome: null,
            cpf: null,
            dataNascimento: null,
            instituicao_id: null,
            rua: null,
            numero: null,
            cidade: null,
            estado: null,
            bairro: null,
            cep: null,
            complemento: null,

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
            }



        }
    },
    methods: {
        mask_cep() {
            let mascara = this.cep
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{5})(.*)/gi, '$1-$2')
            mascara = mascara.replace(/(\d{4}\s)(\d{1,3})(.*)/gi, '$1-$2')
            this.cep = mascara.substr(0,9)
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
            let playload = {
                email: this.email,
                telefone: this.telefone,
                nome: this.nome,
                sobrenome: this.sobrenome,
                cpf: this.cpf,
                dataNascimento: this.dataNascimento,
                instituicao_id: this.instituicao_id,
                rua: this.rua,
                numero: this.numero,
                cidade: this.cidade,
                estado: this.estado,
                bairro: this.bairro,
                cep: this.cep,
                complemento: this.complemento,
            }

            if(this.credencial == 15) {
                playload.credencial = 21
                localStorage.setItem('user_logged_credential_id', 21)
            }
            let res = await this.Super.put_admin(this.id, playload) 

            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false

            if(this.credencial == 15) {
                window.location.href = "#/meu-plano"
            }

        },
        maskTel() {            
            this.telefone = this.telefone.replace(/\D/gi, '')
            this.telefone = this.telefone.replace(/(\d{2})(.*)/gi, '($1) $2')
            this.telefone = this.telefone.replace(/\((\d{2})\)\s(\d{1})(.*)/gi, '($1) $2 $3')
            this.telefone = this.telefone.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})(.*)/gi, '($1) $2 $3-$4')
            this.telefone = this.telefone.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})-(\d{4})(.*)/gi, '($1) $2 $3-$4')
        },        
        masCpf() {
            this.cpf = this.cpf.replace(/\D/gi, '')
            this.cpf = this.cpf.replace(/(\d{3})(.*)/gi, '$1.$2')
            this.cpf = this.cpf.replace(/(\d{3})\.(\d{3})(.*)/gi, '$1.$2.$3')
            this.cpf = this.cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(.*)/gi, '$1.$2.$3-$4')
            this.cpf = this.cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})(.*)/gi, '$1.$2.$3-$4')
        },
        async viaCep() {
            if( this.cep.length != 9) {
                return
            }
            this.loading = true
            let res = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
            this.loading = false
            let address = await res.json()
            this.rua = address?.logradouro
            this.bairro = address?.bairro
            this.cidade = address?.localidade
            this.estado = address?.uf
        }
    },
    async created() {

        let res = await this.Super.get_admin(this.cache.user_logged_id)
        this.credencial = this.cache.user_logged_credential_id
        this.id = res.id
        this.nome = res.nome
        this.email = res.email
        this.telefone = res.telefone
        this.sobrenome = res?.sobrenome
        this.cpf = res?.cpf
        this.dataNascimento = res?.dataNascimento
        this.instituicao_id = res?.instituicao_id
        this.rua = res?.rua
        this.numero = res?.numero
        this.cidade = res?.cidade
        this.estado = res?.estado
        this.bairro = res?.bairro
        this.cep = res?.cep
        this.complemento = res?.complemento

    }
}

