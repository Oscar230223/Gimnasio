const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    grupo:{
        type: String,
        require: true
    },
    correo:{
        type: String,
        require: true
    },
    tutor:{
        type: String,
        require: true
    },
    carrera:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true
    },
    matricula:{
        type: String,
        require: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);