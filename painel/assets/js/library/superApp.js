class App {
    base = '//api.doardigital.com.br/v1'
    options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${localStorage.getItem('bearer') || ''}`
        },
        // credentials: "same-origin",
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: null
    }
    obj_to_url(obj) {
        let indices = Object.keys(obj);
        let url = indices.map(i => `${i}=${obj[i]}`).join('&');
        // return url;
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
    async get_admin(id) {
        return await this.get(`/admin/${id}`, {})
    }
    async cadastro_admin(playload) {
        return await this.post('/cadastro', playload)
    }
    async all_admins() {
        return await this.get('/admins', {})
    }
    async list_admin_by_institution(institution_id) {
        return await this.get(`admin/por-instituicao/${institution_id}`, {})
    }
    async status_admin(id, ativo) {
        return await this.put(`/admin/status/${id}`, { ativo })
    }
    async put_admin(id, data = {}) {
        return await this.put(`/admin/${id}`, data)
    }
    async login(email, password) {
        return await this.post('/login', { email, password })
    }
    async recuperar_senha(email) {
        return await this.put(`/admin/nova-senha/${email}`, {})
    }
    async alterar_senha(corruent_user_id, new_pass) {
        return await this.put(`/admin/recupera-senha/${corruent_user_id}`, { password: new_pass })
    }
    async get_doador(id) {
        return await this.get(`/doador/${id}`, {})
    }
    async get_doador_by_institution_id(id) {
        return await this.get(`/doador/por-instituicao/${id}`, {})
    }
    
    async all_doacao() {
        return await this.get(`/doacoes`, {})
    }
    
    async all_doadores() {
        return await this.get(`/doadores`, {})
    }
    async status_doador(id, ativo) {
        return await this.put(`/doador/status/${id}`, { ativo })
    }
    async put_doador(id, playload = {}) {
        return await this.put(`/doador/${id}`, playload)
    }
    async post_doador(playload = {}) {
        // cep, sobrenome, dataNascimento, numero
        return await this.post(`/doador`, playload)
    }
    async get_institution(id) {
        return await this.get(`/instituicao/${id}`, {})
    }
    async all_institution(step = 1) {
        return await this.get(`/instituicoes`, { page: step })
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
    async get_credential(id) {
        return await this.get(`/credencial/${id}`, {})
    }
    async all_credential() {
        return await this.get(`/credenciais`, {})
    }
    async put_credential(id, playload = {}) {
        return await this.put(`/credencial/${id}`, playload)
    }
    async post_credential(playload = {}) {
        return await this.post(`/credencial`, playload)
    }
    async get_meta(id) {
        return await this.get(`/meta/${id}`, {})
    }
    async all_meta() {
        return await this.get(`/meta`, {})
    }
    async put_meta(id, playload = {}) {
        return await this.put(`/meta/${id}`, playload)
    }
    async post_meta(playload = {}) {
        return await this.post(`/meta`, playload)
    }

    async flag_all() {
        return this.get(`/configuracoes`, {});
    }
    async flag_get(id) {
        return this.get(`/configuracao/${id}`, {});
    }
    async flag_put(id, playload) {
        return this.put(`/configuracao/${id}`, playload);
    }
    async flag_post(playload) {
        return this.post(`/configuracao`, playload);
    }
    async flag_get_by_institution(id) {
        return this.get(`/configuracao/por-instituicao/${id}`, {});
    }
    
    async plano_all() {
        return this.get(`/zoop/planos`, {});
    }
    async plano_get(id) {
        return this.get(`/zoop/plano/${id}`, {});
    }
    async plano_get_by_mkt(id) {
        return this.get(`/zoop/plano/por-marketplace/${id}`, {});
    }
    async plano_get_by_institution(id) {
        return this.get(`/zoop/plano/por-instituicao/${id}`, {});
    }
    async plano_put(id, playload) {
        return this.put(`/zoop/plano/${id}`, playload);
    }
    async plano_post(playload) {
        return this.post(`/zoop/plano`, playload);
    }


}

export default App;