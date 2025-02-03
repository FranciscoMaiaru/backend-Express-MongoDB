const express = require('express');
const router = express.Router({ mergeParams: true });
const controllers = require('../controller/transaccion');
const expressVal = require('../validations/expressValidator');
const validarTransaccion = require('../validations/validarTransaccion');

router.get('/history', controllers.readTransaccion ); // Lee transacciones de una cuenta, indicada como param
router.post('/newTransaccion', expressVal.newTransaccion,validarTransaccion, controllers.newTransaccion); // me va  a hacer un update interno en el saldo de la/las cuenta

module.exports = router;