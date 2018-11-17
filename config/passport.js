// Modulos para autenticacion de manera local (usuario y contraseña)
const passport = require('passport');
const local = require('passport-local').Strategy;
// definicion de la estrategia local
const strategy = new local(localStrategy);
// instancia de una conexion a base de datos
const dbConnection = require('./database').connection;
// configuraciones de la autenticacion
passport.use(strategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
//exportacion del modulo de passport
module.exports = passport;
// Iniciador de la estrategia local
function localStrategy(username, password, done){
	query = 'SELECT * FROM usuarios WHERE nom_usuario = ? AND clave_usuario = ?'
	dbConnection.query(query, [username, password], (err, result) => {
		return done(null, result[0]);
	});
}
// Serializacion (establecer el usuario autenticado)
function serialize(user, done){
	return done(null, user.doc_usuario);
}
// Deserializacion (alamacenar los datos del acceso)
function deserialize(id, done){
	query = 'SELECT * FROM usuarios WHERE doc_usuario = ?'
	dbConnection.query(query, [id], (err, result) => {
		return done(null, result[0]);
	});
}