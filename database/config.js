const mongoose = require('mongoose');


const dbConnection = async() => {
    try {

        // mongoose.set('strictQuery', true); // Configura strictQuery en true
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          
        console.log('DB Online')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en inicializar DB')
    }
}

// ,{
//     UseNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// }

module.exports = {
    dbConnection
}