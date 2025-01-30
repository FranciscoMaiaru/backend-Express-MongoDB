const express = require('express');
const router = express.Router();
const controllers = require('../controller/transaccion');
const expressVal = require('../validations/expressValidator');

router.get('/readTransacciones/:cuentaId', controllers.readTransaccion ); // Lee transacciones de una cuenta, indicada como param
router.post('/createTransaccion', expressVal.newTransaccion, controllers.newTransaccion); // me va  a hacer un update interno en el saldo de la cuenta

module.exports = router;