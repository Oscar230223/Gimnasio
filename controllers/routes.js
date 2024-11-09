const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Administrador = require("./Models/administrador"); 
const Estudiante = require('./Models/estudiante');


router.get("/", (req, res) => {
    res.render("index");
});

//
router.get("/perfilAdmin", (req, res) => {
    res.render("perfilAdmin");
});

// Ruta para registrar un nuevo administrador (POST)
router.post("/admin/registro", async (req, res) => {
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

router.get("/ActualizarContraseña", (req, res) => {
    res.render("actualizar_contraseña");
});

router.get("/Sucursal", (req, res) => {
    res.render("Sucursal");
});

router.get("/BuzonQuejas", (req, res) => {
    res.render("BuzonQuejas");
});

router.get("/Contacto", (req, res) => {
    res.render("contacto");
});

router.get("/Login", (req, res) => {
    res.render("login");
});

router.get("/Recuperar", (req, res) => {
    res.render("RecuperarContra");
});

router.get("/Registro", (req, res) => {
    res.render("registro");
});

router.get("/Perfil", (req, res) => {
    res.render("Perfil");
});



module.exports = router;