const cache = {
    set user_logged_name(name) { localStorage.setItem('user_logged_name', name) },
    get user_logged_name() { return localStorage.getItem('user_logged_name') },
    set user_logged_id(id) { localStorage.setItem('user_logged_id', id) },
    get user_logged_id() { return localStorage.getItem('user_logged_id') }, 
    set user_logged_credential_id(id) { localStorage.setItem('user_logged_credential_id', id) },
    get user_logged_credential_id() { return localStorage.getItem('user_logged_credential_id') },
    set bearer(token) { localStorage.setItem('bearer', token) },
    get bearer() { return localStorage.getItem('bearer') },    
    set institution(id) { localStorage.setItem('institution', id) },
    get institution() { return localStorage.getItem('institution') },
    set email(email) { localStorage.setItem('email', email) },
    get email() { return localStorage.getItem('email') },
    set edit( val ) { 
        if( val ) {
            localStorage.setItem( 'IS_EDITING', val ) 
        }else {
            localStorage.removeItem( 'IS_EDITING' )             
        }
    },
    get edit() { return localStorage.getItem( 'IS_EDITING' ) },
}

export default cache;