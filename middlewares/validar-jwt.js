const { response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = ( req, res = response, next ) => {

    // x-tokem de headers
    const token = req.header('x-token');
    
    // Validar
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        })
    }

    try {

        const { uid, name } = jwt.verify( 
            token, 
            process.env.SECRET_JWT_SEED,
        );

        // Grabo en la req (IMP POSTGRESQL logica)
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })   
    }

    next();

}

module.exports = {
    validarJWT
}