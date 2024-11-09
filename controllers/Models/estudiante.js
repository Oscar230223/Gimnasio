const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        
    },
    grupo:{
        type: String,
        
    },
    correo:{
        type: String,
        required: true,
        unique: true 
    },
    tutor:{
        type: String,
        
    },
    carrera:{
        type: String,
        
    },
    password:{
        type: String,
        required: true
    },
    matricula:{
        type: String,
        
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    estado: { 
        type: String, 
        default: 'Activo' }
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);