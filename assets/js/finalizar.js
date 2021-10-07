import Vue from './library/vue.js'
import SuperApp from './library/SuperApp.js'
import Domain from './library/Domain.js'
import cache from './library/cache.js'

const Super = new SuperApp
globalThis.app = new Vue({
    data: {
        Super,
        Domain,
        cache,
        institution_id: null,
        loading: false,
        title: 'Betania',
        logo_evendas: null,
        logo: {
            top: './sass/doacoesbethania.com.br/logo/2.png',
            footer: './sass/doacoesbethania.com.br/logo/1.png'
        },
        backgroundColor: '#FFF',
        header: {
            align: '',
            backgroundColor: '#25b3c2',
            backgoundImage: './sass/doacoesbethania.com.br/galery/1.jpg',
        },
        urlVideo: 'https://www.youtube.com/watch?v=H-GrnWRc2i4',
        videos: [],
        depoimento_video: [],
        galerys: [],
        layout: {
            title_depoimento: "?",
            title_video: "?",
            title_galeria: "?",
            decription_galeria: "?",
            sitacao: "?",
            bio: "?",
            copy: "?",
            logo_topo: '',
            color: '#C00',
            logo: './assets/img/default.png',
            image_1: 'default.png',
            image_2: 'default.png',
            image_3: 'default.png',
            image_4: 'default.png',
            image_5: 'default.png',
            image_6: 'default.png',
            bg_top: 'default.png',
            bg_footer: 'default.png',
        },
        galery_title: null,
        pop_id: 'QpxA_ZxGX_M',
        pop_status: false,
        footer: {
            color: '#FFFFFF',
            backgroundColor: '#25b3c2'
        },
        institution: {},
        flags: [],
        flagsIds: {},
        error: {
            status: false,
            text: 'error ao finalizar tente novamente mais tarde'
        },
        doacao: {
            plan_id: null,
            recorrente: 1,
            amount: '',
            amount_custon: 0,
            nome: '',
            sobrenome: '',
            dataNascimento: '',
            email: '',
            telefone: '',
            cpf: '',
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            card: "",
            validade: "",
            cvv: "",
            nome_card: "",
            payment_type: 'card',
            complemento: 'nao definido',
            sexo: "",
        },

    },
    methods: {
        preview(e) {
            let input = e.target
            let name = e.target.getAttribute('data-name')
            var reader = new FileReader();
            reader.onload = async (e) => {
                this.loading = true
                this.logo = e.target.result
                let res = await this.Super.upload(this.institution_id, input.files[0])
                this.layout[name] = res.nomeImagem
                await this.Super.flag_put(this.flagsIds.LAYOUT, {
                    base64: btoa(JSON.stringify(this.layout)),
                    flag: 'LAYOUT',
                    instituicao_id: this.institution_id
                })
                this.loading = false
            }
            reader.readAsDataURL(input.files[0]);
        },
        error_image(e) {
            e.target.src = './assets/img/default.png'
        },
        async add_galery() {
            let input = this.$refs.image_galery
            this.loading = true
            let res = await this.Super.upload(this.institution_id, input.files[0])
            let playload = {
                src: res.nomeImagem,
                title: this.galery_title,
            }
            this.galerys.push(playload)
            await this.Super.flag_put(this.flagsIds.GALERIA, {
                base64: btoa(JSON.stringify(this.galerys)),
                flag: 'GALERIA',
                instituicao_id: this.institution_id
            })
            this.loading = false

        },
        addVideo() {
            this.videos.push(this.urlVideo)
            this.put_videos()
        },
        addDepoimentos() {
            this.depoimento_video.push(this.urlVideo)
            this.put_depoimento_videos()
        },
        getDomain() {
            return window.location.hostname
        },
        is_site_active(status = true) {
            if (!status)
                window.location.href = "/pagina-em-manutencao.html"
        },
        async exist_flags() {
            let list_flags = Object.keys(this.flags)
            this.Domain.default_flags.forEach(flag_name => {
                if (!list_flags.includes(flag_name)) {
                    let playload = {
                        base64: this.Domain.default_flags_content[flag_name] || btoa(JSON.stringify({})),
                        flag: flag_name,
                        instituicao_id: this.institution_id
                    }
                    this.Super.flag_post(playload)
                }
            })
        },
        async put_videos() {
            let res = await this.Super.flag_put(this.flagsIds.VIDEOS, {
                base64: btoa(JSON.stringify(this.videos)),
                flag: 'VIDEOS',
                instituicao_id: this.institution_id
            })
        },
        async put_depoimento_videos() {
            let res = await this.Super.flag_put(this.flagsIds.DEPOIMENTOS, {
                base64: btoa(JSON.stringify(this.depoimento_video)),
                flag: 'DEPOIMENTOS',
                instituicao_id: this.institution_id
            })
        },
        async put_layout(e) {
            let name = e.target.getAttribute('name')
            this.layout[name] = e.target.innerText
            let res = await this.Super.flag_put(this.flagsIds.LAYOUT, {
                base64: btoa(JSON.stringify(this.layout)),
                flag: 'LAYOUT',
                instituicao_id: this.institution_id
            })
        },
        money() {
            let val = this.doacao.valor_custon
            val = val.replace('.', '')
            val = val.replace(/\D/gi, '')
            val = val ? val : 0
            val = `${parseInt(val)}` ?? '0'
            switch (val.length) {
                case 0:
                    val = '00,00'
                    break;
                case 1:
                    val = val.replace(/(\d{1})/gi, '00,0$1')
                    break;
                case 2:
                    val = val.replace(/(\d{2})/gi, '00,$1')
                    break;
                case 3:
                    val = val.replace(/(\d{1})(\d{2})/gi, '0$1,$2')
                    break;
                case 4:
                    val = val.replace(/(\d{2})(\d{2})/gi, '$1,$2')
                    break;
                case 5:
                    val = val.replace(/(\d{3})(\d{2})/gi, '$1,$2')
                    break;
                case 6:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})/gi, '$1.$2,$3')
                    break;
                default:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})(.*)/gi, '$1.$2,$3')
                    break;
            }

            this.doacao.valor_custon = val
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
        mask_cep() {
            let mascara = this.doacao.cep
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{5})(.*)/gi, '$1-$2')
            mascara = mascara.replace(/(\d{4}\s)(\d{1,3})(.*)/gi, '$1-$2')
            this.doacao.cep = mascara
        },
        mask_cpf() {
            let mascara = this.doacao.cpf
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{3})(.*)/gi, '$1.$2')
            mascara = mascara.replace(/(\d{3}\.)(\d{3})(.*)/gi, '$1$2.$3')
            mascara = mascara.replace(/(\d{3}\.)(\d{3}\.)(\d{3})(.*)/gi, '$1$2$3-$4')
            mascara = mascara.replace(/(\d{3}\.)(\d{3}\.)(\d{3})-(\d{2})(.*)/gi, '$1$2$3-$4')
            this.doacao.cpf = mascara
        },
        mask_tel() {
            let mascara = this.doacao.telefone
            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{2})(.*)/gi, '($1) $2')
            mascara = mascara.replace(/\((\d{2})\)\s(\d{1})(.*)/gi, '($1) $2 $3')
            mascara = mascara.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})(.*)/gi, '($1) $2 $3-$4')
            mascara = mascara.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})-(\d{4})(.*)/gi, '($1) $2 $3-$4')
            this.doacao.telefone = mascara
        },
        async pay() {

            this.loading = true

            localStorage.setItem('type_paymente', this.doacao.payment_type)

            let playload = {
                doador_id: "",
                metodo: this.doacao.payment_type == "boleto" ? "boleto" : "credit_card",
                instituicao_id: this.institution_id,
                quantia: (this.doacao.amount == 0 ? this.doacao.amount_custon : this.doacao.amount).replace(',',''),
            }

            playload.cliente = {
                nome: this.doacao.nome,
                cpf: this.doacao.cpf.replace(/\D/gi, ''),
                email: this.doacao.email,
                telefone:'%2B55'+this.doacao.telefone.replace(/\D/gi, ''),
                dataNascimento: this.doacao.dataNascimento,
                sexo: this.doacao.sexo
            }

            if (this.doacao.recorrente != 1) {
                playload.cliente.cep = this.doacao.cep
                playload.cliente.rua = this.doacao.rua
                playload.cliente.numero = this.doacao.numero
                playload.cliente.bairro = this.doacao.bairro
                playload.cliente.complemento = "Apto 777"
                playload.cliente.cidade = this.doacao.cidade
                playload.cliente.estado = this.doacao.estado
            }

            if (this.doacao.recorrente == 1) {
                playload.endereco = {
                    cep: this.doacao.cep,
                    rua: this.doacao.rua,
                    numero: this.doacao.numero,
                    bairro: this.doacao.bairro,
                    complemento: "Apto 777",
                    cidade: this.doacao.cidade,
                    estado: this.doacao.estado,
                }
            }

            if (this.doacao.recorrente == 1) {
                playload.plano_id = this.doacao.plan_id
                playload.valor_plano = this.doacao.amount
                playload.cliente.telefone = this.doacao.telefone.replace(/\D/gi, '').substr(2, 11)
                playload.cliente.ddd = this.doacao.telefone.replace(/\D/gi, '').substr(0, 2)
            }

            if (this.doacao.recorrente != 1) {
                playload.items = {
                    id: "1",
                    nome: "Doação",
                    preco_unico: this.doacao.amount,
                    quantidade: 1
                }
            }

            if (playload.metodo == "credit_card") {
                playload.cartao_credito = {
                    nome: this.doacao.nome_card,
                    cvv: this.doacao.cvv.replace(/\D/gi, ''),
                    numero: this.doacao.card.replace(/\D/gi, ''),
                    expiracao: this.doacao.validade.replace(/\D/gi, '')
                }

            }

            let res = {}

            if (this.doacao.recorrente == 1) {
                res = await this.Super.payPlan(playload)
            }

            if (this.doacao.recorrente != 1) {
                res = await this.Super.pay(playload)
            }

            this.loading = false

            if (res.status == "success") {
                if (this.doacao.payment_type == 'boleto') {
                    this.cache.boleto_code = res.boleto.codigo_barras
                    this.cache.boleto_link = res.boleto.url
                } else {
                    this.cache.boleto_code = false
                    this.cache.boleto_link = false
                }                
            } 

            if (res.status != "success") {
                this.error.status = true
                this.error.text = res.message
            }

            let full_phone = this.doacao.telefone.replace(/\D/gi, '') + ''
            let full_address = `${this.doacao.cep} - ${this.doacao.rua}, ${this.doacao.numero} - ${this.doacao.bairro} - ${this.doacao.cidade} - ${this.doacao.estado}`
            
            let payload_utils = {
                email: playload.cliente.email,
                nome: playload.cliente.nome,
                ddd: full_phone.substr(0,2),
                telefone: full_phone.substr(2,11),
                endereco: full_address,
                status: this.doacao.payment_type == 'boleto' ? 'waiting_payment' : 'paid',
                tipo: this.doacao.payment_type,
                codigo_boleto: res.boleto?.codigo_barras || null,
                valor: playload.quantia,
                boleto_url: res.boleto?.url || null,
                instituicao_id: this.institution_id,
            }

            let send_notify = await this.Super.notificacao_email({
                status: res.status, 
                instituicao_id: this.institution_id, 
                to: playload.cliente.email, 
                nome: playload.cliente.nome
            })
            
            if (res.status == "success") {
                this.loading = true
                await this.Super.send_mensagem(payload_utils)
                this.loading = false
                window.location.href = "/obrigado.html"
            }
            
        },
        async viaCep() {
            let cep = this.doacao.cep
            if(cep.length < 9) return
            this.loading = true
            let res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            let address = await res.json()
            this.doacao.rua = address.logradouro
            this.doacao.bairro = address.bairro
            this.doacao.cidade = address.localidade
            this.doacao.estado = address.uf
            this.loading = false
        }
    },
    filters: {
        getIdYoutube: url => new URL(url).searchParams.get('v'),
        getTumb: id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        getImage: (nameImage, id) => `https://api.doardigital.com.br/storage/app/public/${id}/${nameImage}`,
        money: val => {
            val = val.replace('.', '')
            val = val.replace(/\D/gi, '')
            val = val ? val : 0
            val = `${parseInt(val)}` ?? '0'
            switch (val.length) {
                case 0:
                    val = '00,00'
                    break;
                case 1:
                    val = val.replace(/(\d{1})/gi, '00,0$1')
                    break;
                case 2:
                    val = val.replace(/(\d{2})/gi, '00,$1')
                    break;
                case 3:
                    val = val.replace(/(\d{1})(\d{2})/gi, '0$1,$2')
                    break;
                case 4:
                    val = val.replace(/(\d{2})(\d{2})/gi, '$1,$2')
                    break;
                case 5:
                    val = val.replace(/(\d{3})(\d{2})/gi, '$1,$2')
                    break;
                case 6:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})/gi, '$1.$2,$3')
                    break;
                default:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})(.*)/gi, '$1.$2,$3')
                    break;
            }
            return val
        }
    },
    async mounted() {

        this.doacao.recorrente = localStorage.getItem('recorrente')
        this.doacao.amount = localStorage.getItem('amount')
        this.doacao.email = localStorage.getItem('email')
        this.doacao.amount_custon = localStorage.getItem('amount_custon')
        this.doacao.plan_id = localStorage.getItem('plan_id')

        let instituicao = (await this.Super.get_institution_by_domain(this.Domain.corruent()))
        instituicao.ativo = true
        this.is_site_active(instituicao?.ativo)
        this.institution_id = instituicao?.id

        let flag_all = (await this.Super.flag_get_by_institution(instituicao.id)).reverse()
        let config_site = JSON.parse(atob(flag_all.find(post => post.flag == 'CONFIG_SITE').base64))
        if (config_site.logo) {
            this.layout.logo = `https://api.doardigital.com.br/storage/app/public/${instituicao.id}/${config_site.logo}`
            this.logo_evendas = config_site.logo
        }
        if (config_site.cor_main) {
            this.backgroundColor = config_site.cor_main
        }
        this.title = config_site?.title || null

    }
}).$mount("#doar_app");