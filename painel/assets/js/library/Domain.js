export default {
    image(id_instituicao, name_image) {
        return `https://api.doardigital.com.br/storage/app/public/${id_instituicao}/${name_image}`
    },
    corruent() {
        // return 'tillman.com'
        return window.location.hostname
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