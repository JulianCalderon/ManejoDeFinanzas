// Modulo de express
const express = require('express');
// Instancia de un router
const router = express.Router();
// Se establecen los controladores para las funciones de las rutas del router
const controller = require("../controllers/authController");
// Modulo para la autenticacion de la aplicacion
const passport = require('../config/passport');
// Modulo de opciones
const options = require('../config/options');
// Ruta que muestra el formulario de login
router.get('/login', controller.root)
// Ruta de login con su middleware passport.authenticate para validar la autenticacion
router.post('/login', passport.authenticate('local', options.authOptions));
// Ruta de registro de usuarios
router.post('/register', controller.register);
// Ruta de cierre de sesion
router.get('/logout', controller.logout);
//Exportacion del modulo router de la ruta de autenticacion
module.exports = router;