// Instancia de la base de datos
const db = require('../config/database');
// Frontend principal
exports.root = (req, res) => {
	res.render('login');
};
// Exportacion del cierre de sesion y respuesta
exports.logout = (req, res) => {
	req.logout();
	res.send('Logout');
}
// Exportacion de la funcion de registro de usuario
exports.register = (req, res) => {
	values = {
		doc_usuario: parseInt(req.body.documento),
		nom_usuario: req.body.nombre,
		apel_usuario: req.body.apellido,
		clave_usuario: parseInt(req.body.clave)
	};
	db.insert(req, res, 'usuarios', values);
}