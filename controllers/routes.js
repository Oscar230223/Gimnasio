const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/perfilAdmin", (req, res) => {
    res.render("perfilAdmin");
});

router.get("/ActualizarContraseña", (req, res) => {
    res.render("actualizar_contraseña");
});

router.get("/Alumnos", (req, res) => {
    res.render("alumnos");
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