const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
    correo: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Administrador', administradorSchema);
