const mongoose = require('mongoose');

const AlertaSchema = new mongoose.Schema({
    fecha:{
        type: String,
        required: true
    },
    hora:{
        type: Number,
        required: true
    },
    maquina:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Alerta', AlertaSchema);