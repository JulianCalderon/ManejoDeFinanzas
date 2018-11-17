const db = require('../config/database');
const dateController = require('../controllers/dateController');
const tableName = 'gastos_usuario';
const innerTable = 'gastos_usuario GU INNER JOIN categorias_gastos CG ON GU.id_categoria_gastos = CG.id_categoria_gastos';
const montoField = 'monto_gasto';

exports.insert = (req, res) => {
	values = {
		doc_usuario: req.user.doc_usuario,
		id_categoria_gastos: req.body.idCategoria,
		motivo_gasto: req.body.motivo,
		monto_gasto: req.body.monto,
		fecha_gasto: dateController.getCurrentDate()
	};
	console.log(values);
	db.insert(req, res, tableName, values);
}
exports.read = (req, res) => {
	values = {
		doc_usuario: req.user.doc_usuario
	};
	fields = 'GU.id_gasto, GU.id_categoria_gastos, CG.nom_categoria_gastos, GU.motivo_gasto, GU.monto_gasto'
	db.read(req, res, fields, innerTable, values);
}
exports.update = (req, res) => {
	fields = {
		doc_usuario: req.user.doc_usuario,
		id_categoria_gastos: req.body.idCategoria,
		motivo_gasto: req.body.motivo,
		monto_gasto: req.body.monto
	};
	condition = {
		id_gasto: req.query.id
	};
	values = [
		fields,
		condition
	];
	db.update(req, res, tableName, values);
}
exports.delete = (req, res) => {
	values = {
		id_gasto: req.query.id
	};
	db.delete(req, res, tableName, values);
}
exports.sum = (req, res) => {
	values = {
		doc_usuario: req.user.doc_usuario
	}
	db.sum(req, res, montoField, tableName, values);
}
exports.getCategories = (req, res) => {
	let query = 'SELECT id_categoria_gastos, nom_categoria_gastos FROM categorias_gastos';
	db.connection.query(query, (err, result) => {
		res.send(result);
	});
}