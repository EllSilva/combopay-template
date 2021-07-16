import Vue from './library/vue.js'
import Router from './library/vue-router.js'
import router_list from './data/router.js'
import menu from './module/c-menu.js'
import footer from './module/c-footer.js'
import header from './module/c-header.js'
import aside from './module/c-aside.js'
import metas from './module/c-metas.js'
import perfil from './module/c-perfil.js'
import privacidade from './module/c-privacidade.js'
import config from './module/c-config.js'
import instituicao from './module/c-instituicao.js'
import script from './module/c-script.js'
import modulos from './module/c-modulos.js'
import doadores from './module/c-doadores.js'
import doacoes from './module/c-doacoes.js'
import credenciais from './module/c-credenciais.js'
import usuarios from './module/c-usuarios.js'
import planos from './module/c-planos.js'
import emails from './module/c-emails.js'
import login from './module/c-login.js'
import recuperar from './module/c-recuperar.js'
import credenciaisNovo from './module/c-credenciais-novo.js'
import credenciaisEditar from './module/c-credenciais-editar.js'
import usuariosNovo from './module/c-usuarios-novo.js'
import usuariosEdit from './module/c-usuarios-edit.js'
import cInicio from './module/c-inicio.js'
import sass from './module/c-sass.js'
import sassEditar from './module/c-sass-editar.js'
import sassNovo from './module/c-sass-novo.js'
import correios from './module/c-correios.js'
import mailingBoss from './module/c-mailing-boss.js'
import Email from './module/c-email.js'
import rdStation from './module/c-rd-station.js'
import evendas from './module/c-evendas.js'
import emailsEdit from './module/c-emails-edit.js'
import planosNovo from './module/c-planos-novo.js'
import planosEditar from './module/c-planos-editar.js'
import qr_code from './module/c-qr.js'
import cadastro_sucesso from './module/c-cadastro-sucesso.js'
import step from './module/c-step.js'
import list_cupom from './module/c-cupon-list.js'
import novo_cupom from './module/c-cupom-novo.js'
import edit_cupom from './module/c-cupom-edit.js'
import list_divisao from './module/c-divisao-list.js'
import novo_divisao from './module/c-divisao-novo.js'
import edit_divisao from './module/c-divisao-edit.js'

Vue.use(Router)
Vue.component('c-menu', menu )
Vue.component('c-footer', footer )
Vue.component('c-header', header )
Vue.component('c-aside', aside )
Vue.component('c-metas', metas )
Vue.component('c-perfil', perfil )
Vue.component('c-privacidade', privacidade )
Vue.component('c-config', config )
Vue.component('c-instituicao', instituicao )
Vue.component('c-script', script )
Vue.component('c-modulos', modulos )
Vue.component('c-doadores', doadores )
Vue.component('c-doacoes', doacoes )
Vue.component('c-credenciais', credenciais )
Vue.component('c-usuarios', usuarios )
Vue.component('c-planos', planos )
Vue.component('c-emails', emails )
Vue.component('c-login', login )
Vue.component('c-recuperar', recuperar )
Vue.component('c-credenciais-novo', credenciaisNovo )
Vue.component('c-credenciais-editar', credenciaisEditar )
Vue.component('c-usuarios-novo', usuariosNovo )
Vue.component('c-usuarios-edit', usuariosEdit )
Vue.component('c-inicio', cInicio )
Vue.component('c-sass', sass )
Vue.component('c-sass-editar', sassEditar )
Vue.component('c-sass-novo', sassNovo )
Vue.component('c-correios', correios )
Vue.component('c-mailing-boss', mailingBoss )
Vue.component('c-email', Email )
Vue.component('c-rd-station', rdStation )
Vue.component('c-evendas', evendas )
Vue.component('c-emails-edit', emailsEdit )
Vue.component('c-planos-novo', planosNovo )
Vue.component('c-planos-editar', planosEditar )
Vue.component('c-qr', qr_code )
Vue.component('c-cadastro-sucesso', cadastro_sucesso )
Vue.component('c-step', step )
Vue.component('c-cupon-list', list_cupom )
Vue.component('c-cupom-novo', novo_cupom )
Vue.component('c-cupom-edit', edit_cupom )
Vue.component('c-divisao-list', list_divisao )
Vue.component('c-divisao-novo', novo_divisao )
Vue.component('c-divisao-edit', edit_divisao )

const router = new Router({ routes: router_list })

Vue.prototype.$eventHub = new Vue()

const app = new Vue({
    router,
    data: {
        title: 'Painel',
        open: true,
    },
    created() {
        var corruent = this
        this.$eventHub.$on('toggle-menu', function( val ) {
            corruent.open = val
        })
    }
}).$mount('#app')




globalThis.go_editing = function() {
    globalThis.localStorage.setItem( 'IS_EDITING', true )
    window.location.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
}