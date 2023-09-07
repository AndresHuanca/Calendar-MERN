const moment = require("moment");

const isDate = ( value, { location, path } ) => {
    // Campo vacio
    if( !isDate ){
        return false;
    }

    // Valida si la fecha es valida
    const fecha = moment( value );
    if( fecha.isValid() ){
        return true;
    }else{
        return false;
    }

}

module.exports = { isDate };