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
    obj_to_url(obj, next_level = null) {
        var query = [];
        for (var key in obj) {
            switch (typeof obj[key]) {
                case 'string':
                case 'number':
                    if (next_level != null) {
                        query.push(`${next_level}[${key}]=${obj[key]}&`)
                        console.log(next_level)
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
    // obj_to_url(obj) {
    //     let indices = Object.keys(obj);
    //     let url = indices.map(i => `${i}=${obj[i]}`).join('&');
    //     return encodeURI(url);
    // }
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
    async flag_put(id, { base64, flag, instituicao_id }) {
        return await this.put(`/configuracao/${id}`, { base64, flag, instituicao_id });
    }
    async flag_post({ base64, flag, instituicao_id }) {
        return await this.post(`/configuracao`, { base64, flag, instituicao_id });
    }
    async flag_get_by_institution(id) {
        return await this.get(`/configuracao/por-instituicao/${id}`, {});
    }
    async upload(instituicao_id, images) {
        const formData = new FormData();
        formData.append('instituicao_id', instituicao_id);
        formData.append('images', images);
        let res = await fetch(`${this.base}/upload`, {
            method: 'POST',
            body: formData
        })
        return await res.json()

    }

    async payCard(instituicao_id, playload) {
        let data = {
            nome: "José",
            sobrenome: "Da Silva",
            email: "teeste@teste.com",
            cpf: "76537741807",
            dataNascimento: "1982-12-15",
            instituicao_id: "6cf4bb1e78c6428786fc8fe6ddada3a6",
            telefone: "12029579543",
            rua: "Av das Américas",
            numero: "27",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            bairro: "Downtown",
            cep: "10023000",
            complemento: "APT 601",
            amount: "35500",
            creditCard: {
                holder_name: "Bruno Vieira",
                expiration_month: "22",
                expiration_year: "2222",
                card_number: "4539003370725497",
                security_code: "111"
            },
            installment_plan: {
                "number_installments": "2"
            }
        }
        return await this.post(`/zoop/cartao-credito`, { ...data, instituicao_id: '6cf4bb1e78c6428786fc8fe6ddada3a6' })
    }

    async payBoleto(playload) {
        return await this.post(`/transacao`, playload)
    }

}

export default App;


function objectParametize(obj, next_level = null) {
    var query = [];
    for (var key in obj) {
        switch (typeof obj[key]) {
            case 'string':
            case 'number':
                if (next_level != null) {
                    query.push(`${next_level}[${key}]=${obj[key]}&`)
                    console.log(next_level)
                } else {
                    query.push(`${key}=${obj[key]}&`)
                }
                break
            case 'object':
                query.push(objectParametize(obj[key], key))
        }
    }
    return query.join('');
}
