const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvent, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

// Optimización de JWT
// si solo quiero efectuar con 3 soloco debajo de los 3
router.use( validarJWT );

router.get('/', getEventos );

router.post(
    '/',
    [ //middleware
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio no es valida').custom( isDate ),
        check('end', 'La fecha finalización no es valida').custom( isDate ),
        validarCampos,
    ], 
    crearEvento 
);

router.put(
    '/:id',
    [ //middleware
        check('id', 'El id no es valido').isMongoId(),
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio no es valida').custom( isDate ),
        check('end', 'La fecha finalización no es valida').custom( isDate ),
        validarCampos,
    ], 
    actualizarEvent 
);

router.delete(
    '/:id',
    [ //middleware
        check('id', 'El id no es valido').isMongoId(),
        validarCampos,
    ], 
    eliminarEvento 
);

module.exports = router;
