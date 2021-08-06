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
        logo: {
            top: './sass/doacoesbethania.com.br/logo/2.png',
            footer: './sass/doacoesbethania.com.br/logo/1.png'
        },
        backgroundColor: '#25b3c2',
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
            logo: 'default',
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
        planos: [],
        doacao: {
            recorrente: 1,
            amount: '5000',
            amount_custon: 0,
            nome: 'Bruno',
            sobrenome: 'Vieira',
            dataNascimento: '1987-09-18',
            email: 'br.rafael@outlook.com',
            telefone: '82999999999',
            cpf: '76537741807',
            cep: '06786270',
            rua: 'Rua gonçalves dias',
            numero: '45',
            bairro: 'JD. Margaridas',
            estado: 'SP',
            cidade: 'Taboão da Serra',
            card: null,
            validade: null,
            cvv: null,
            nome_card: null,
            payment_type: 'boleto',
            complemento: 'nao definido'
        },

    },

    methods: {
        error_image(e) {
            e.target.src = './assets/img/default.png'
        },
        is_site_active(status = true) {
            if (!status)
                window.location.href = "/pagina-em-manutencao.html"
        },
        money() {
            let val = this.doacao.amount_custon
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
            this.doacao.amount_custon = val
        },
        async pay() {
            this.loading = true
            window.location.href = "/finalizar.html"

            localStorage.setItem('recorrente', this.doacao.recorrente )
            localStorage.setItem('amount', this.doacao.amount )
            localStorage.setItem('email', this.doacao.email )
            localStorage.setItem('amount_custon', this.doacao.amount_custon )

            this.loading = false
        },
        setPlan( id ) {
            if(this.doacao.recorrente) {
                localStorage.setItem('plan_id', id)
            }else {
                localStorage.removeItem('plan_id')
            }
        }
    },
    filters: {
        getImage: (nameImage, id = 10) => `https://api.doardigital.com.br/storage/app/public/${id}/${nameImage}`,
        money( valor ) {
            let val = valor
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
        let instituicao = (await this.Super.get_institution_by_domain(this.Domain.corruent()))
        instituicao.ativo = true
        this.is_site_active(instituicao?.ativo)
        this.institution_id = instituicao?.id
        this.planos = (await this.Super.plano_get_by_mkt(this.institution_id) )
        console.log( this.planos )
        let all_flags = await this.Super.flag_get_by_institution(this.institution_id)
        this.flagsIds = this.Domain.flags_ids(all_flags)
        this.flags = this.Domain.render_flag(all_flags)
        this.layout = { ...this.layout, ...this.flags.LAYOUT }
        console.log(this.layout)
    }
}).$mount("#doar_app");