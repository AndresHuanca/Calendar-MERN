const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async( req, res = response ) => {
    
    const eventos = await Evento.find()
                                .populate( 'user', 'name' );
                                // .populate( 'user', 'name email' );
                                // .populate( 'user' );

    try {

        res.status(201).json({
            ok: true,
            eventos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
            msm: error.message,
        })
    }   
}

const crearEvento = async( req, res = response ) => {
    
    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
            msm: error.message,
        })
    }   
}

const actualizarEvent = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );
        // Validacion
        if( !evento ){
            res.status(404).json({
                ok: false,
                msg: 'Evento no exite por ese id',
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid,
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.status(201).json({
            ok: true,
            evento: eventoActualizado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
            msm: error.message,
        })
    }   
}

const eliminarEvento= async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );
        // Validacion
        if( !evento ){
            res.status(404).json({
                ok: false,
                msg: 'Evento no exite por ese id',
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }

        await Evento.findByIdAndDelete( eventoId );


        res.status(201).json({
            ok: true,
            msg: 'Evento eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
            msm: error.message,
        })
    }   
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvent,
    eliminarEvento,
}