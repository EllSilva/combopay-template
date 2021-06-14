import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App

export default {
    template: "#c-inicio",
    data: function () {
        return {
            Super,
            cache,
            loading: false,
            resumos: [
                { label: "Total Doações", valor: "R$ 10.000", estimativa: -25, ico: "total-doacoes-0984e3.svg", color: "#0984e3" },
                { label: "Doações Concluidas", valor: "R$ 7.000", estimativa: 10, ico: "doacoes-concluidas-20bf63.svg", color: "#20bf63" },
                { label: "Doações em Aberto", valor: "R$ 200", estimativa: 15, ico: "doacoes-em-aberto-f9d64b.svg", color: "#f9d64b" },
                { label: "Doações Vencidas", valor: "R$ 1.000", estimativa: 15, ico: "doacoes-vencidas-ff7675.svg", color: "#ff7675" },
                { label: "Doações Boletos", valor: "R$ 4.000", estimativa: 0, ico: "doacoes-boletos-2eccba.svg", color: "#2eccba" },
                { label: "Doações Creditos", valor: "R$ 5.000", estimativa: 10, ico: "doacoes-creditos-249e90.svg", color: "#249e90" },
                { label: "Doações PIX", valor: "R$ 1.000", estimativa: 10, ico: "doacoes-pix-5320bf.svg", color: "#5320bf" },
                { label: "Doações Previstas", valor: "R$ 15.000", estimativa: 0, ico: "doacoes-previstas-616161.svg", color: "#616161" },
                { label: "Novos Doadores", valor: 39, estimativa: 25, ico: "novos-doadores-20bf63.svg", color: "#20bf63" },
                { label: "Doadores Recorrentes", valor: 20, estimativa: 0, ico: "doadores-recorrentes-0984e3.svg", color: "#0984e3" },
                { label: "Doadores Únicos", valor: 30, estimativa: 0, ico: "doadores-unicos-7fc1e6.svg", color: "#7fc1e6" },
                { label: "Doação Media", valor: "R$ 100", estimativa: 0, ico: "doacoes-media-2ecc71.svg", color: "#2ecc71" },
                { label: "Doadores Adinplentes", valor: 50, estimativa: 0, ico: "doadores-adimplentes-20bf63.svg", color: "#20bf63" },
                { label: "Doadores Inadimplentes", valor: 7, estimativa: 0, ico: "doadores-inadimplentes-ff7675.svg", color: "#ff7675" },
            ]
        }
    }
}