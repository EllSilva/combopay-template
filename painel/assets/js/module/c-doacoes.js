import cache from '../library/cache.js'
import App from '../library/superApp.js'
const Super = new App

export default {
    template: "#c-doacoes",
    data: function () {
        return {
            cache,
            Super,
            doacoes: [
                { status: true, method: 'Cartão', data: '10/06/2021', nome: 'Marcos', valor: '50,00' },
                { status: true, method: 'Cartão', data: '09/06/2021', nome: 'Marielle', valor: '50,00' },
                { status: true, method: 'Cartão', data: '09/06/2021', nome: 'Fatima', valor: '50,00' },
                { status: true, method: 'Cartão', data: '09/06/2021', nome: 'Aiyana', valor: '50,00' },
                { status: true, method: 'Cartão', data: '08/06/2021', nome: 'Marcos', valor: '50,00' },
                { status: true, method: 'Cartão', data: '08/06/2021', nome: 'Marcos', valor: '50,00' },
                { status: true, method: 'Cartão', data: '08/06/2021', nome: 'Marcos', valor: '50,00' },
                { status: true, method: 'Cartão', data: '08/06/2021', nome: 'Marcos', valor: '50,00' },
                { status: true, method: 'Cartão', data: '08/06/2021', nome: 'Marcos', valor: '50,00' },
                { status: true, method: 'Cartão', data: '08/06/2021', nome: 'Marcos', valor: '50,00' },
            ]
        }
    },
    filters: {
        is_price( price ) {
            let valor = price.toLocaleString('pt-br', {minimumFractionDigits: 2})
            return  `R$${valor}`
        }
    },
    async mounted() {
        let res = await this.Super.all_doacao()
        console.log( res )
    }
}
