export default {
    set edit( val ) { 
        if( val ) {
            localStorage.setItem( 'IS_EDITING', val ) 
        }else {
            localStorage.removeItem( 'IS_EDITING' )             
        }
    },
    get edit() { return localStorage.getItem( 'IS_EDITING' ) },
    get boleto_code() { return localStorage.getItem('BAR_CODE') },
    set boleto_code( val ) { localStorage.setItem('BAR_CODE', val) },
    get boleto_link() { return localStorage.getItem('LINK_BOLETO') },
    set boleto_link( val ) { localStorage.setItem('LINK_BOLETO', val) },
}