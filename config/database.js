// Modulos para la base de datos
const mysql = require('mysql');
const dbOptions = require('./options').dbOptions;
// Variables

// Instancia de la coneccion
const dbConnection = mysql.createConnection(dbOptions);
// Exportacion de la intancia de la coneccion
exports.connection = dbConnection;
// Exportacion de la funcion de insercion en una tabla
exports.insert = (req, res, tableName, values) => {
	query = `INSERT INTO ${tableName} SET ?`;
	dbConnection.query(query, values, (err, result) => {
		if(err){
			res.send('error');
		}else{
			res.json(result);
		}
	});
}
// Exportacion de la funcion de lectura en una tabla
exports.read = (req, res, fields, tableName, values) => {
	query = `SELECT ${fields} FROM ${tableName} WHERE ?`;	
	dbConnection.query(query, values, (err, result) => {
		if(err){
			res.send('error');
		}else{
			res.json(result);
		}
	});
}
// Exportacion de la funcion de actualizacion en una tabla
exports.update = (req, res, tableName, values) => {
	query = `UPDATE ${tableName} SET ? WHERE ?`;
	dbConnection.query(query, values, (err, result) => {
		if(err){
			res.send('error');
		}else{
			res.json(result);
		}
	});
}
// Exportacion de la funcion de eliminacion en una tabla
exports.delete = (req, res, tableName, values) => {
	query = `DELETE FROM ${tableName} WHERE ?`;
	dbConnection.query(query, values, (err, result) => {
		if(err){
			res.send('error');
		}else{
			res.json(result);
		}
	});
}
// Exportacion de la funcion para obtener la suma de una columna en una tabla
exports.sum = (req, res, sumField, tableName, values) => {
	query = `SELECT SUM(${sumField}) AS Monto FROM ${tableName} WHERE ?`;
	dbConnection.query(query, values, (err, result) => {
		if(err){
			res.send('error');
		}else{
			res.json(result);
		}
	});
}