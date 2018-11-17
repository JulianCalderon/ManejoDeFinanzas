// Instancia de la base de datos
const db = require('../config/database');
const dateController = require('../controllers/dateController');
// Exportacion de la respuesta de login correcto
exports.index = (req, res) => {
	let query = `CALL filtroGeneral(${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getDailyIncomes = (req, res) => {
	let currentDate = dateController.getCurrentDate().replace(/-/g, '');
	let query = `CALL graficoIngresos(${currentDate}, ${currentDate}, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getDailyOutcomes = (req, res) => {
	let query = `CALL graficoGastos(20181116, 20181116, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getWeeklyIncomes = (req, res) => {
	let query = `CALL graficoIngresos(20181116, 20181116, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getWeeklyOutcomes = (req, res) => {
	let query = `CALL graficoGastos(20181116, 20181116, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getMonthlyIncomes = (req, res) => {
	let query = `CALL graficoIngresos(20181116, 20181116, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getMonthlyOutcomes = (req, res) => {
	let query = `CALL graficoGastos(20181116, 20181116, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}