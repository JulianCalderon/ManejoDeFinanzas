// Modulo de express
const express = require('express');
// Instancia de un router
const router = express.Router();
// Se establecen los controladores para las funciones de las rutas del router
const controller = require("../controllers/reportController");
//Exportacion del modulo router de la ruta de autenticacion
router.get('/', controller.index);
router.get('/dailyIncome', controller.getDailyIncomes);
router.get('/dailyOutcome', controller.getDailyOutcomes);
router.get('/weeklyIncome', controller.getWeeklyIncomes);
router.get('/weeklyOutcome', controller.getWeeklyOutcomes);
router.get('/monthlyIncome', controller.getMonthlyIncomes);
router.get('/monthlyOutcome', controller.getMonthlyOutcomes);
module.exports = router;