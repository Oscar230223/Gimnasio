const express = require("express");
const path = require("path");
const routes = require("./controllers/routes");
const rbd = require("./controllers/DB.rutas");
const bodyParser = require('body-parser');
const { User, connectDb } = require('./controllers/Config/DB');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

//Configurar nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', //Tipo de servicio
    auth: {
        //Variables de configuración
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

connectDb();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));

app.post('/recuperar-contrasena', async (req, res) => {
    const { correo } = req.body;
    console.log(`Recuperando contraseña para: ${correo}`);

    try {
        //Buscar estudiante en la BD
        const user = await User.findOne({ correo: correo }).exec();
        console.log('Usuario encontrado:', user); 

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        //Configurar correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Recuperación de Contraseña',
            text: `Tu contraseña es: ${user.password} la cual ha sido cifrada para mayor seguridad. Para descifrarla e iniciar sesión, utiliza el siguiente enlace: https://crackstation.net/`
        };

        //Envió del correo
        await transporter.sendMail(mailOptions);
        res.render('correoEnviado', { message: 'Correo enviado exitosamente, revisa tu bandeja de entrada, sino lo encuentras revisa el spam.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
});

app.post("/submit-complaint", async (req, res) => {
    const { email, date, location, details } = req.body;

    const userEmail = email || "correo_desconocido@example.com"; 

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lunajanethc45@gmail.com", 
            pass: "bmlictpzctdkhbnv",        
        },
    });

    const mailOptions = {
        from: `"Queja recibida" <${userEmail}>`,
        to: "perlis2433@gmail.com",  
        subject: "Buzón de quejas (EmergencyApp)",
        text: `Fecha: ${date}\nLugar: ${location}\nDetalles del problema: ${details}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("La queja se ha enviado correctamente.");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).send("Hubo un problema al enviar la queja.");
    }
});


app.use("/", routes);
app.use("/database", rbd);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});