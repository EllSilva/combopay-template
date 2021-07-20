export default function objectParametize(obj, next_level = null) {
    var query = []; 
    for (var key in obj) {
        switch (typeof obj[key]) {
            case 'string':
            case 'number':
                if ( next_level != null ) {
                    query.push( `${next_level}[${key}]=${obj[key]}&` )   
                    console.log(next_level)
                } else {
                    query.push( `${key}=${obj[key]}&` )                    
                }
            break
            case 'object':
                query.push( objectParametize(obj[key], key ) )
        }
    }
    return query.join('');
}