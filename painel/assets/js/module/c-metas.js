import App from '../library/superApp.js'
import cache from '../library/cache.js'
import mask_money from '../mask/money.js'
const Super = new App

export default {
    template: "#c-metas",
    data: function () {
        return {
            Super,
            cache,
            mask_money,
            meses: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
            playload: [],
            name_flag: 'METAS_2021',
            loading: false,
            is_flag: false,
            flag_id: null,
            error: {
                status: false,
                text: 'Salvo com sucesso',
                type: 'success'
            }
        }
    },
    filters: {
        mask_money,
    },
    async mounted() {
        let res = (await this.Super.flag_get_by_institution(this.cache.institution)).reverse()
        let flag = res.find(post => post.flag == this.name_flag && post.instituicao_id == this.cache.institution)
        this.flag_id =  flag.id
        if (flag) {
            let data = JSON.parse(atob(flag.base64))
            this.playload = data
        } else {
            this.is_flag = true
        }
    },
    methods: {
        mask_money,
        async save() {
            this.loading = true
            let res = await this.Super.flag_put(this.flag_id, {
                flag: this.name_flag,
                instituicao_id: this.cache.institution,
                base64: btoa(JSON.stringify(this.playload))
            })
            this.error.status = true
            this.error.text = res.message
            this.error.type = res.status
            this.loading = false
        }
    }
}