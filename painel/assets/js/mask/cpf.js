export default cpf => {
    // 000.000.000-00
    cpf = cpf.replace(/(\d{3})(.*)/gi, '$1.$2')
    cpf = cpf.replace(/(\d{3})\.(\d{3})(.*)/gi, '$1.$2.$3')
    cpf = cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(.*)/gi, '$1.$2.$3-$4')
    cpf = cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})(.*)/gi, '$1.$2.$3-$4')
    return cpf
}