const mongoose = require('mongoose');

const chatGrupalSchema = new mongoose.Schema({
    usuario:{
        type: String,
        require: true,
    },
    correo:{
        type: String,
        require: true,
    },
    mensaje:{
        type: String,
        require: true,  
    },
    carrera:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('chatGrupal', chatGrupalSchema);