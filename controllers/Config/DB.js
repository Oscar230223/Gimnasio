const mongoose = require("mongoose");
//DB_MONGO = 'mongodb://localhost:27017/BDUniversidadFronteriza';
const DB_MONGO = 'mongodb+srv://oscaromarhernandezdavila:Gmhxayq8qfF8YJX2@desarrolloweb.n1wblyp.mongodb.net/?retryWrites=true&w=majority&appName=DesarrolloWeb';

const connectDb = async () => {
  try {
    await mongoose.connect(DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de Datos Conectada");
  } catch (error) {
    console.log(error);
    console.log("BackEnd detenido");
    process.exit(1);
  }
};

const userSchema = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'estudiantes');

module.exports = {
  User, 
  connectDb
};