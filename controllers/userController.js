// Instancia de la base de datos
const db = require('../config/database');
// Exportacion de la respuesta de login correcto
exports.root = (req, res) => {
	res.render('userDashboard');
}