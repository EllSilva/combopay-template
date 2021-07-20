import cpf from "./cpf.js"
import cnpj from "./cnpj.js"
export default cpf_cnpj => {
    cpf_cnpj = cpf_cnpj.replace(/\D/gi, '')
    if(cpf_cnpj.length > 11 ) {
        cpf_cnpj = cnpj(cpf_cnpj)
    }else {
        cpf_cnpj = cpf(cpf_cnpj)
    }   
    return cpf_cnpj
}