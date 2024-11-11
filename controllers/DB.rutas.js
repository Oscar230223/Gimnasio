const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Estudiante = require('./Models/estudiante');
const Alerta = require('./Models/alertas');
const Buzon = require('./Models/buzon');
const Chat = require('./Models/chat');
const Administrador = require('./Models/administrador');
const crypto = require("crypto");
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const secretKey = 'hola';


// Estudiantes
router.post('/database/estudiantes', async (req, res) => {
    try {
        const { Nombre, Apellidos, Matricula,Tutor, Correo, Carrera, Grupo, Password } = req.body;
        let regexPass = /^[a-zA-Z0-9!#$%&\/?\\¿¡+*~{[^`},;.:-_-]+$/;
        let regexUser = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexUser.test(Nombre) || !regexUser.test(Apellidos)) {
            return res.status(400).json({ message: 'Nombre o Apellidos contienen caracteres no permitidos' });
        }
        if (!regexCorreo.test(Correo)) {
            return res.status(400).json({ message: 'El correo electrónico no es válido' });
        }
        if (!regexPass.test(Password)) {
            return res.status(400).json({ message: 'La contraseña contiene caracteres no permitidos' });
        }
        let hash = crypto.createHash('sha1');
        let data = hash.update(Password, 'utf-8');
        let gen_hash = data.digest('hex');
        const estudiante = new Estudiante({
            nombre: Nombre,
            grupo: Grupo,
            tutor: Tutor,
            correo: Correo,
            carrera: Carrera,
            password: gen_hash,           
            resetPasswordExpires: undefined,
            resetPasswordToken: undefined
        });
        const nuevoEstudiante = await estudiante.save();
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        if (error.code === 11000) {
            const campoDuplicado = Object.keys(error.keyPattern)[0];
            res.status(400).json({ message: `El campo ${campoDuplicado} ya está registrado` });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Ruta para registrar un nuevo estudiante
router.post("/estudiantes", async (req, res) => {
    try {
        const { correo, nombre, password, grupo, tutor, carrera } = req.body;

        let hash = crypto.createHash("sha1");
        let data = hash.update(password, "utf-8");
        let gen_hash = data.digest("hex");

        const estudiante = new Estudiante({
            correo,
            nombre,
            password: gen_hash,
            grupo,
            tutor,
            carrera,
        });

        const nuevoEstudiante = await estudiante.save();
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post('/database/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        console.log('Datos recibidos:', req.body);

        let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexCorreo.test(correo)) {
            return res.status(400).json({ message: 'El correo electrónico no es válido' });
        }

        const estudiante = await Estudiante.findOne({ correo });
        if (!estudiante) {
            return res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }

        let hash = crypto.createHash('sha1');
        let data = hash.update(password, 'utf-8');
        let gen_hash = data.digest('hex');
        if (gen_hash !== estudiante.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        //Generar token
        const token = jwt.sign(
            { id: estudiante._id, correo: estudiante.correo },
            secretKey,
            { expiresIn: '10s' }
        );

        //Guardar token en cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 10000 }); //Cookie que expira en un tiemepo

        console.log({
            nombre: estudiante.nombre,
            grupo: estudiante.grupo,
            tutor: estudiante.tutor,
            carrera: estudiante.carrera
        });
        // Enviar cada propiedad individualmente
        res.render("Perfil", {
            nombre: estudiante.nombre,
            grupo: estudiante.grupo,      
            tutor: estudiante.tutor,      
            carrera: estudiante.carrera    
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Verificación del token
const verificarToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Se requiere autenticación.' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified; //Guardar información del usuario
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};


router.post('/logout', (req, res) => {
    //res.clearCookie('token');
    //res.redirect('/login');
    res.cookie('token', '', { httpOnly: true, expires: new Date(0), path: '/' });
    res.cookie('adminToken', '', { httpOnly: true, expires: new Date(0), path: '/' });
    res.redirect('/')
});

router.post('/database/buzon', async (req, res) => {
    try {
        const { Nombre, Correo, Asunto, Mensaje } = req.body;
        const buzon = new Buzon({
            nombre: Nombre,
            correo: Correo,
            asunto: Asunto,
            mensaje: Mensaje,
        });
        const nuevoBuzon = await buzon.save();
        res.status(201).json(nuevoBuzon);
    } catch (error) {
        if (error.code === 11000) {
            const campoDuplicado = Object.keys(error.keyPattern)[0];
            res.status(400).json({ message: `El campo ${campoDuplicado} ya está registrado` });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

router.post('/database/chat', async (req, res) => {
    try {
        const { Usuario,Mensaje } = req.body;
        const chat = new Chat({
            usuario: Usuario,
            mensaje: Mensaje,
        });
        const nuevoChat = await chat.save();
        //res.status(201).json(nuevoChat);
        //return res.render("Chat",chat)
        return res.redirect("/chat")
    } catch (error) {
        if (error.code === 11000) {
            const campoDuplicado = Object.keys(error.keyPattern)[0];
            res.status(400).json({ message: `El campo ${campoDuplicado} ya está registrado` });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});




// Ruta para registrar un nuevo administrador
router.post('/admin/registro', async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Hash de la contraseña
        let hash = crypto.createHash('sha1');
        let data = hash.update(password, 'utf-8');
        let gen_hash = data.digest('hex');

        const nuevoAdmin = new Administrador({
            correo,
            password: gen_hash
        });

        await nuevoAdmin.save();
        res.status(201).json({ message: 'Administrador creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para iniciar sesión del administrador
router.post('/admin/login', async (req, res) => {
    try {
        const { correo, password } = req.body;

        const admin = await Administrador.findOne({ correo });
        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        let hash = crypto.createHash('sha1');
        let data = hash.update(password, 'utf-8');
        let gen_hash = data.digest('hex');
        if (gen_hash !== admin.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign(
            { id: admin._id, correo: admin.correo, role: 'admin' },
            secretKey,
            { expiresIn: '1h' }
        );

        // Guardar token en cookie
        res.cookie('adminToken', token, { httpOnly: true, maxAge: 3600000 });

        // Redirigir a perfiladmin
        res.redirect('/perfiladmin');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/estudiantes', async (req, res) => {
    try {
        const datos = await Estudiante.find(); // Asegúrate de usar el modelo correcto aquí
        console.log(datos);
        return res.json(datos); // Enviar JSON para verificar datos sin renderizar
    } catch (err) {
        console.error('Error al obtener los datos:', err); // Muestra el error en la consola
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos' });
    }
});


router.get('/estudiantes/:id', async (req, res) => {
    try {
        const id = req.params.id; // Obtener el parámetro 'id' de la URL
        const estudiante = await Estudiante.findOne({ _id: id }); // Buscar un solo estudiante por su ID
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        console.log(estudiante);
        return res.json(estudiante); // Enviar el estudiante encontrado
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos' });
    }
});

router.get('/alerta', async (req, res) => {
    try {
        const datos = await Alerta.find(); // Asegúrate de usar el modelo correcto aquí
        console.log(datos);
        return res.json(datos); // Enviar JSON para verificar datos sin renderizar
    } catch (err) {
        console.error('Error al obtener los datos:', err); // Muestra el error en la consola
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos' });
    }
});

router.get('/api/usuario', async (req, res) => {
    try {
        const email = req.user.email; // Se asume que el correo del usuario está disponible en el objeto de sesión o JWT

        // Busca al usuario por su correo
        const usuario = await Estudiante.findOne({ email: email });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario); // Devuelve los datos del usuario
    } catch (err) {
        console.error('Error al obtener los datos del usuario:', err);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos' });
    }
});


// Función de verificación de token solo para administradores
const verificarTokenAdmin = (req, res, next) => {
    const token = req.cookies.adminToken || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Se requiere autenticación de administrador.' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        if (verified.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden acceder.' });
        }
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

// Ruta protegida para el perfil de administrador
router.get('/perfiladmin', verificarTokenAdmin, (req, res) => {
    return res.render('perfilAdmin'); // Verifica que exista perfilAdmin.ejs en /views
});

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        console.log('Datos recibidos:', correo, password);

        let admin = await Administrador.findOne({ correo });
        console.log('Administrador encontrado:', admin);
        if (admin) {
            let hash = crypto.createHash('sha1').update(password, 'utf-8').digest('hex');
            console.log('Hash de la contraseña:', hash);
            if (hash === admin.password) {
                const token = jwt.sign({ id: admin._id, correo: admin.correo, role: 'admin' }, secretKey, { expiresIn: '1h' });
                res.cookie('adminToken', token, { httpOnly: true, maxAge: 3600000 });
                return res.redirect('/perfiladmin');
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        }

        let usuario = await Estudiante.findOne({ correo });
        console.log('Usuario encontrado:', usuario);
        if (usuario) {
            let hash = crypto.createHash('sha1').update(password, 'utf-8').digest('hex');
            if (hash === usuario.password) {
                const token = jwt.sign({ id: usuario._id, correo: usuario.correo, role: 'usuario' }, secretKey, { expiresIn: '1h' });
                res.cookie('userToken', token, { httpOnly: true, maxAge: 3600000 });
                return res.redirect('/Perfil');
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        }

        return res.status(404).json({ message: 'Usuario no encontrado' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/perfilAdmin', async (req, res) => {
    try {
        // Obtén todos los usuarios de la colección Estudiante
        const usuarios = await Estudiante.find({}, 'nombre estado'); // Cambia 'estado' a cualquier otro campo que exista en el esquema si es necesario

        // Renderiza la vista y pasa la variable usuarios
        res.render('perfilAdmin', { usuarios });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

router.get('/calificaciones', async (req, res) => {

});






module.exports = router;