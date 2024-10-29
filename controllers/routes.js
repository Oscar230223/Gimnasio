const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/ActualizarContraseña", (req, res) => {
    res.render("actualizar_contraseña");
});

router.get("/Alumnos", (req, res) => {
    res.render("alumnos");
});

router.get("/Becas", (req, res) => {
    res.render("Becas");
});

router.get("/BuzonQuejas", (req, res) => {
    res.render("BuzonQuejas");
});

router.get("/Carreras", (req, res) => {
    res.render("Carreras");
});

/*router.get("/Chat", (req, res) => {
    res.render("Chat",{datos:[]});
});*/

router.get("/Contacto", (req, res) => {
    res.render("contacto");
});

router.get("/ExamenAdmision", (req, res) => {
    res.render("Examen");
});

router.get("/Login", (req, res) => {
    res.render("login");
});

router.get("/MapaDelSitio", (req, res) => {
    res.render("mapa");
});

router.get("/Recuperar", (req, res) => {
    res.render("RecuperarContra");
});

router.get("/Recuperar2", (req, res) => {
    res.render("RecuperarMensaje");
});

router.get("/Recuperar3", (req, res) => {
    res.render("RecuperarPregunta");
});

router.get("/Recuperar4", (req, res) => {
    res.render("VerificacionCelular");
});

router.get("/Registro", (req, res) => {
    res.render("registro");
});

router.get("/SobreNosotros", (req, res) => {
    res.render("SobreNosotros");
});

router.get("/Perfil", (req, res) => {
    res.render("Perfil");
});

router.get("/404", (req, res) => {
    res.render("404");
});

router.get("/faqs", (req, res) => {
    res.render("faqs");
});

router.get("/calificaciones", (req, res) => {
    res.render("calificaciones");
});

module.exports = router;