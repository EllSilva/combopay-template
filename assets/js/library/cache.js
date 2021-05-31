export default {
    set edit( val ) { 
        if( val ) {
            localStorage.setItem( 'IS_EDITING', val ) 
        }else {
            localStorage.removeItem( 'IS_EDITING' )             
        }
    },
    get edit() { return localStorage.getItem( 'IS_EDITING' ) },
}