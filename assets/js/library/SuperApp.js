class App {
    base = '//api.doardigital.com.br/v1'
    options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${localStorage.getItem('bearer') || ''}`
        },
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: null
    }
    obj_to_url(obj) {
        let indices = Object.keys(obj);
        let url = indices.map(i => `${i}=${obj[i]}`).join('&');
        return encodeURI(url);
    }
    async post(path, data, verbo = 'POST') {
        this.options.body = this.obj_to_url(data)
        this.options.method = verbo
        if (verbo == 'PUT') {
            this.options.body = JSON.stringify(data)
            this.options.headers = {
                'Content-Type': 'application/json',
                'Content-Length': this.options.body.length,
                'Authorization': `Bearer ${localStorage.getItem('bearer') || ''}`
            }
        }
        try {
            let res = await fetch(`${this.base}${path}`, this.options)
            let status_code = res.status
            let res_in_json = await res.json()
            return { ...res_in_json, status_code }
        } catch (error) {
            return {
                status_code: 500,
                next: false,
                message: 'erro catastrófico'
            }
        }
    }
    async put(path, data) {
        return await this.post(path, data, 'PUT')
    }
    async delete(path, data) {
        return await this.post(path, data, 'DELETE')
    }
    async get(path, data = {}) {
        try {
            let res = await fetch(`${this.base}${path}?${this.obj_to_url(data)}`)
            let res_in_json = await res.json()
            return res_in_json
        } catch (error) {
            return {
                status_code: 500,
                next: false,
                message: 'erro catastrófico'
            }
        }
    }
    async get_institution_by_domain(domain) {
        return await this.get(`/instituicao/por-dominio/${domain}`, {})
    }
    async get_institution(id) {
        return await this.get(`/instituicao/${id}`, {})
    }
    async all_institution() {
        return await this.get(`/instituicoes`, {})
    }
    async status_institution(id, ativo) {
        return await this.put(`/instituicao/status/${id}`, { ativo })
    }
    async put_institution(id, playload = {}) {
        return await this.put(`/instituicao/${id}`, playload)
    }
    async post_institution(playload = {}) {
        return await this.post(`/instituicao`, playload)
    }
    async flag_all() {
        return await this.get(`/configuracoes`, {});
    }
    async flag_get(id) {
        return this.get(`/configuracao/${id}`, {});
    }
    async flag_put(id, {base64,flag,instituicao_id}) {
        return await this.put(`/configuracao/${id}`, {base64,flag,instituicao_id});
    }
    async flag_post({base64,flag,instituicao_id}) {
        return await this.post(`/configuracao`, {base64,flag,instituicao_id});
    }
    async flag_get_by_institution(id) {
        return await this.get(`/configuracao/por-instituicao/${id}`, {});
    }
    async upload( instituicao_id, images ) {
        const formData  = new FormData();
        formData.append('instituicao_id', instituicao_id);
        formData.append('images', images);
        let res = await fetch( `${this.base}/upload`, {
            method: 'POST',
            body: formData
        } )
        return await res.json()
        
    }

    async pay( instituicao_id, playload ) {
        return await this.post( `/pagamento`, { instituicao_id, ...playload } )
    }

}

export default App;