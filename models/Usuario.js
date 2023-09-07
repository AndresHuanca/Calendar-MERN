const { Schema, model, pluralize } =  require('mongoose');
// Para que no pluralice el documento
// pluralize(null);

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

});

module.exports = model('Usuario', UsuarioSchema );