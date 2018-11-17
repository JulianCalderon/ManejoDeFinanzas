const db = require('../config/database');
const dateController = require('../controllers/dateController');
const tableName = 'ingresos_usuario';
const innerTable = 'ingresos_usuario IU INNER JOIN categorias_ingresos CI ON IU.id_categoria_ingresos = CI.id_categoria_ingresos';
const montoField = 'monto_ingreso';

exports.insert = (req, res) => {
	values = {
		doc_usuario: req.user.doc_usuario,
		id_categoria_ingresos: req.body.idCategoria,
		motivo_ingreso: req.body.motivo,
		monto_ingreso: req.body.monto,
		fecha_ingreso: dateController.getCurrentDate()
	};
	db.insert(req, res, tableName, values);
}
exports.read = (req, res) => {
	values = {
		doc_usuario: req.user.doc_usuario
	};
	fields = 'IU.id_ingreso, IU.id_categoria_ingresos, CI.nom_categoria_ingresos, IU.motivo_ingreso, IU.monto_ingreso'
	db.read(req, res, fields, innerTable, values);
}
exports.update = (req, res) => {
	fields = {
		doc_usuario: req.user.doc_usuario,
		id_categoria_ingresos: req.body.idCategoria,
		motivo_ingreso: req.body.motivo,
		monto_ingreso: req.body.monto
	};
	condition = {
		id_ingreso: req.query.id
	};
	values = [
		fields,
		condition
	];
	db.update(req, res, tableName, values);
}
exports.delete = (req, res) => {
	values = {
		id_ingreso: req.query.id
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
	let query = 'SELECT id_categoria_ingresos, nom_categoria_ingresos FROM categorias_ingresos';
	db.connection.query(query, (err, result) => {
		res.send(result);
	});
}