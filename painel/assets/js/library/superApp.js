class App {
    base = '//api.doardigital.com.br/v1'
    base_2 = '//painel.doardigital.com.br/api'
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
    obj_to_url(obj, next_level = null) {
        var query = [];
        for (var key in obj) {
            switch (typeof obj[key]) {
                case 'string':
                case 'number':
                    if (next_level != null) {
                        query.push(`${next_level}[${key}]=${obj[key]}&`)
                    } else {
                        query.push(`${key}=${obj[key]}&`)
                    }
                    break
                case 'object':
                    query.push(this.obj_to_url(obj[key], key))
            }
        }
        return query.join('');
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
            this.desloga({ ...res_in_json, status_code })
            return { ...res_in_json, status_code }
        } catch (error) {
            return {
                status_code: 500,
                next: false,
                message: 'erro catastrófico'
            }
        }
    }
    desloga(playload) {
        let path = window.location.protocol
        path += "//"
        path += window.location.hostname
        path += ":"
        path += window.location.port
        path += "/painel"
        if (playload.status == 'Token is Expired') {
            window.location.href = path
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

    async get_doador_history(id) {
        let assinatura = await this.get(`/assinatura/por-doador/${id}`, {})
        let transacao = await this.get(`/transacao/por-doador/${id}`, {})
        return [...assinatura, ...transacao]
    }

    async all_doacao() {
        return await this.get(`/doacoes`, {})
    }
    async all_doacao_by_institution(id) {
        let unica = await this.get(`/transacao/por-instituicao/${id}`, {})
        let mensal = await this.get(`/assinatura/por-instituicao/${id}`, {})
        return [...unica, ...mensal]
    }

    async all_doadores() {
        return await this.get(`/doadores`, {})
    }
    async all_doadores_by_istitution(id) {
        return await this.get(`/doador/por-instituicao/${id}`, {})
    }
    async status_doador(id, ativo) {
        return await this.put(`/doador/status/${id}`, { ativo })
    }
    async put_doador(id, playload = {}) {
        return await this.put(`/doador/${id}`, playload)
    }
    async post_doador(playload = {}) {
        return await this.post(`/doador`, playload)
    }

    async get_institution_by_domain(domain) {
        return await this.get(`/instituicao/por-dominio/${domain}`, {})
    }
    async get_institution(id) {
        if (id == 0) return {}
        return await this.get(`/instituicao/${id}`, {})
    }
    async all_institution(step = 1) {
        return await this.get(`/instituicoes`, { page: step })
    }
    async search_institution(s) {
        return await this.get(`/instituicao/procura/${s}`, {})
    }
    async all_email_admin_institution(email) {
        return await this.get(`/instituicao/por-master/${email}`, {})
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
    async add_anotacao_institution({ instituicao_id, anotacao }) {
        return await this.post(`/instituicao/anotacao`, { instituicao_id, anotacao })
    }
    async status_institution(id, playload) {
        return await this.put(`/instituicao/status/${id}`, playload)
    }
    async institution_saldo(id_recebedor) {
        return await this.get(`/instituicao/saldo/${id_recebedor}`, {})
    }
    async institution_saques(recebedor_id) {
        return await this.get(`/instituicao/saldo-historico/${recebedor_id}`, {})
    }

    async institution_historico(id_recebedor) {
        return await this.get(`/instituicao/status/${id_recebedor}`, {})
    }

    async get_credential(id) {
        return await this.get(`/credencial/${id}`, {})
    }
    async all_credential(id = 1) {
        return await this.get(`/credenciais`, { page: id })
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
        return this.get(`/plano`, {});
    }
    async plano_get(id) {
        return this.get(`/plano/${id}`, {});
    }
    async plano_get_by_mkt(id) {
        return this.get(`/plano/por-marketplace/${id}`, {});
    }
    async plano_get_by_institution(id) {
        return this.get(`/plano/por-instituicao/${id}`, {});
    }
    async plano_put(id, playload) {
        return this.put(`/plano/${id}`, playload);
    }
    async plano_post(playload) {
        return this.post(`/plano`, playload);
    }

    async split_all() {
        return this.get(`/splits`, {});
    }
    async split_get(id) {
        return this.get(`/split/${id}`, {});
    }
    async split_del(id) {
        return this.put(`/split/${id}`, { ativo: 0 });
    }
    async split_get_by_institution(id) {
        return this.get(`/split/por-instituicao/${id}`, {});
    }
    async split_put(id, playload) {
        return this.put(`/split/${id}`, playload);
    }
    async split_post(playload) {
        return this.post(`/split`, playload);
    }

    async payPlan(playload) {
        return await this.post(`/assinatura`, playload)
    }

    async upload(form) {
        let res = await fetch(`${this.base}/upload`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('bearer') || ''}`
            },
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: form
        })
        return await res.json()
    }

    async get_evendas(instituicao_id) {
        let full_url = this.base_2
        full_url += `/evendas`
        full_url += `?instituicao_id=${instituicao_id}`
        let res = await fetch(full_url)
        return await res.json()
    }

    async save_evendas({ instituicao_id, identificacao_id }) {

        let full_url = this.base_2
        full_url += `/evendas`

        let form = new FormData()
        form.append('instituicao_id', instituicao_id)
        form.append('identificacao_id', identificacao_id)

        let options = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: form
        }

        let res = await fetch(full_url, options)
        return await res.json()

    }


}

export default App;