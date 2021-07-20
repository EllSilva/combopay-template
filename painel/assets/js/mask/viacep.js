export default async cep => {
    cep = cep.replace(/\D/gi, '').substr(0,8)
    let path = `https://viacep.com.br/ws/${cep}/json/`
    let response = await fetch(path)
    return await response.json()
}
