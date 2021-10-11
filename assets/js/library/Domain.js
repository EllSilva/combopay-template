export default {
    image(id_instituicao, name_image) {
        return `https://api.doardigital.com.br/storage/app/public/${id_instituicao}/${name_image}`
    },
    corruent() {
        let domain = window.location.hostname
        if ( domain == '127.0.0.1' ) {
            domain = 'natal.doacoesbethania.com.br'
        }
        domain = domain.replace('.doardigital.com.br', '')        
        return domain
    },
    render_flag(lista = []) {
        let render = {}
        lista.forEach(post => {
            try {
                let flag_name = post?.flag || 'default'
                let json = JSON?.parse(atob(post?.base64) || '{}') || {}
                render[flag_name] = json
            } catch (error) { }
        });
        return render
    },
    flags_ids(lista = []) {
        let render = {}
        lista.forEach(post => {
            try {
                let flag_name = post?.flag || 'default'
                let id = post?.id
                render[flag_name] = id
            } catch (error) { }
        });
        return render
    },
    default_flags: ['VIDEOS', 'DEPOIMENTOS', 'GALERIA', 'LAYOUT'],
    default_flags_content: {
        'VIDEOS' : btoa(JSON.stringify([])), 
        'DEPOIMENTOS' : btoa(JSON.stringify([])), 
        'GALERIA' : btoa(JSON.stringify([])), 
        'LAYOUT' : btoa(JSON.stringify({}))
    },
}