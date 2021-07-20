export default cnpj => {
    cnpj = cnpj.replace(/\D/gi, '')
    cnpj = cnpj.replace(/(\d{2})(.*)/gi, '$1.$2')
    cnpj = cnpj.replace(/(\d{2})\.(\d{3})(.*)/gi, '$1.$2.$3')
    cnpj = cnpj.replace(/(\d{2})\.(\d{3})\.(\d{3})(.*)/gi, '$1.$2.$3/$4')
    cnpj = cnpj.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(.*)/gi, '$1.$2.$3/$4-$5')
    cnpj = cnpj.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})\-(\d{2})(.*)/gi, '$1.$2.$3/$4-$5')
    return cnpj
}