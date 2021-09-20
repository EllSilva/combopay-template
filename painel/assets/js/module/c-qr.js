import App from '../library/superApp.js'
import cache from '../library/cache.js'
const Super = new App
export default {
    template: `
    <div class="l-admin">
        <c-aside></c-aside>
        <c-header></c-header>
        <div class="a-body">
            <div class="body_box">            
                <h1>QR CODE</h1>
                <p> QR CODE para ajudar na divulgação !!!</p>
                <div class="space"/>
                <div ref="print_qr"></div>
            </div>
        </div>
        <c-footer></c-footer>
    </div>
    `,
    data: function () {
        return {
            Super,
            cache,
            dominio: null
        }
    },
    async mounted() {
        let instituicao = await this.Super.get_institution( localStorage.getItem('institution') )
        var qrcode = new QRCode(this.$refs.print_qr, {
            text: `https://${instituicao.subdominio}.doardigital.com.br`,
            width: 230,
            height: 230,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
}