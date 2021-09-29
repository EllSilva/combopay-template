function money( valor ) {
    valor = valor.replace(/\D/gi, '')
    valor = (valor/100).toLocaleString('pt-br', { minimumFractionDigits: 2 })
    return valor

    
}

export default money