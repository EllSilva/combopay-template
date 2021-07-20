export default tel => {    
    tel = tel.replace(/\D/gi, '')
    tel = tel.replace(/(\d{2})(.*)/gi, '($1) $2')
    tel = tel.replace(/\((\d{2})\)\s(\d{1})(.*)/gi, '($1) $2 $3')
    tel = tel.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})(.*)/gi, '($1) $2 $3-$4')
    tel = tel.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})-(\d{4})(.*)/gi, '($1) $2 $3-$4')
    return tel
}