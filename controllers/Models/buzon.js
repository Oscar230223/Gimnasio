const mongoose = require('mongoose');

const BuzonSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true,
    },
    correo:{
        type: String,
        require: true,  
    },
    asunto:{
        type: String,
        require: true
    },
    mensaje: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Buzon', BuzonSchema);