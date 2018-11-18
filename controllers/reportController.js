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
	let currentDate = req.query.firstDay || dateController.getCurrentProcedureDate();
	let query = `CALL graficoIngresos(${currentDate}, ${currentDate}, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getDailyOutcomes = (req, res) => {
	let currentDate = req.query.firstDay || dateController.getCurrentProcedureDate();
	let query = `CALL graficoGastos(${currentDate}, ${currentDate}, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getWeeklyIncomes = (req, res) => {
	let currentWeek = (req.query.firstDay && req.query.lastDay) ? {firstDay:req.query.firstDay, lastDay:req.query.lastDay} : dateController.getCurrentProcedureWeek();
	let query = `CALL graficoIngresos(${currentWeek.firstDay}, ${currentWeek.lastDay}, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getWeeklyOutcomes = (req, res) => {
	let currentWeek = (req.query.firstDay && req.query.lastDay) ? {firstDay:req.query.firstDay, lastDay:req.query.lastDay} : dateController.getCurrentProcedureWeek();
	let query = `CALL graficoGastos(${currentWeek.firstDay}, ${currentWeek.lastDay}, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getMonthlyIncomes = (req, res) => {
	let currentMonth = (req.query.firstDay && req.query.lastDay) ? {firstDay:req.query.firstDay, lastDay:req.query.lastDay} : dateController.getCurrentProcedureMonth();
	let query = `CALL graficoIngresos(${currentMonth.firstDay}, ${currentMonth.lastDay}, ${req.user.doc_usuario})`;
	console.log(query);
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}
exports.getMonthlyOutcomes = (req, res) => {
	let currentMonth = (req.query.firstDay && req.query.lastDay) ? {firstDay:req.query.firstDay, lastDay:req.query.lastDay} : dateController.getCurrentProcedureMonth();
	let query = `CALL graficoGastos(${currentMonth.firstDay}, ${currentMonth.lastDay}, ${req.user.doc_usuario})`;
	db.connection.query(query, (err, result) => {
		res.send(result[0]);
	});
}