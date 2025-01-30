const express = require('express');
const router = express.Router();
const controllers = require('../controller/cliente');
const cuentasRouter = require('./cuentas');
const expressVal = require('../validations/expressValidator');

router.use('/cuentas', cuentasRouter);
router.get('/', controllers.myCliente); 
router.delete('/',controllers.deleteCliente);
router.put('/', expressVal.updateCliente, controllers.updateCliente); 

module.exports = router;