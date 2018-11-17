// Modulo de express
const express = require('express')
// Instancia del router de usuarios
const router = express.Router();
// Se establecen los controladores para las rutas de usuario
const controller = require('../controllers/userController')
const incomeController = require('../controllers/incomeController')
const outcomeController = require('../controllers/outcomeController')
// Ruta que muestra el frontend
router.get('/', controller.root);
// Ruta que inserta un ingreso del usuario autenticado
router.post('/addIncome', incomeController.insert);
// Ruta que inserta un gasto del usuario autenticado
router.post('/addOutcome', outcomeController.insert);
// Ruta que lee los ingresos del usuario autenticado
router.get('/readIncome', incomeController.read);
// Ruta que lee los gastos del usuario autenticado
router.get('/readOutcome', outcomeController.read);
// Ruta que actualiza un ingreso del usuario autenticado
router.post('/updateIncome', incomeController.update);
// Ruta que actualiza un gasto del usuario autenticado
router.post('/updateOutcome', outcomeController.update);
// Ruta que borra un ingreso del usuario autenticado
router.post('/deleteIncome', incomeController.delete);
// Ruta que borra un gasto del usuario autenticado
router.post('/deleteOutcome', outcomeController.delete);
// Ruta que obtiene la suma de los ingresos del usuario autenticado
router.post('/sumIncome', incomeController.sum);
// Ruta que obtiene la suma de los gastos del usuario autenticado
router.post('/sumOutcome', outcomeController.sum);
// Ruta que obtiene todas las categorias de ingresos
router.get('/categoryIncome', incomeController.getCategories);
// Ruta que obtiene todas las categorias de gastos
router.get('/categoryOutcome', outcomeController.getCategories);
// Exportacion del router de usuario
module.exports = router;