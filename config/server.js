// Express es el modulo que permite manejar más facilmente servidores web
const express = require('express');
// server es una instancia de una aplicación express ('servidor')
const server = express();
// Se establecen los router para cada ruta
const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const reportRouter = require('../routes/reportRouter');
// Se establecen los controladores que va a usar el servidor
const mainController = require('../controllers/mainController');
// options es el archivo que contiene todas las configuraciones requeridas por diversos componentes de la aplicacion
const options = require('./options');
// passport permite gestionar la autenticacion de la aplicacion
const passport = require('./passport');
// Modulos para gestionar la base de datos
const mysql = require('mysql');
const connection = require('express-myconnection');
// session maneja las cookies y variables de session de la aplicacion
const session = require('express-session');
// almacenamiento de la variable de sesión en la base de datos
const MysqlStore = require('express-mysql-session')(session);
const sessionStore = new MysqlStore(options.dbOptions);
options.sessionOptions.store = sessionStore;
// morgan es un logger para facilitar la revisión de peticiones al servidor
const morgan = require('morgan');
// Configuraciones del servidor
// Puerto a utilizar
server.set('port', process.env.PORT || 3000);
// Motor de plantillas para pug
server.set('view engine', 'pug');
//Middlewares
// Carpeta de archivos publicos (CSS, JS, ...)
server.use(express.static(`${__dirname}/../public`));
// parser para los datos que vienen de formularios
server.use(express.urlencoded(options.urlencodedOptions));
// activacion del logger
server.use(morgan('dev'));
// inicio de la session
server.use(session(options.sessionOptions));
// inicio de la autorizacion
server.use(passport.initialize());
server.use(passport.session());
// middleware para base de datos
server.use(connection(mysql, options.dbOptions, 'single'));
// establecer las rutas principales con sus routers
server.use('/auth', authRouter);
server.use('/user', mainController.authMiddleware, userRouter);
server.use('/reports', mainController.authMiddleware, reportRouter);
// exportacion del servidor como modulo
module.exports = server;