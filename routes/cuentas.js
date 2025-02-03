const express = require('express');
const router = express.Router();
const controllers = require('../controller/cuenta');
const transaccionesRouter = require('./transacciones');
const expressVal = require('../validations/expressValidator');
const validarCuenta = require('../validations/validarCuenta');

router.use('/transacciones/:cuentaId',validarCuenta,transaccionesRouter);

router.post('/createCuenta', expressVal.newCuenta, controllers.newCuenta);
router.get('/', expressVal.readCuenta, controllers.readCuenta); // muestra todas las cuentas de un cliente
router.put('/:cuentaId',validarCuenta,expressVal.updateCuenta, controllers.updateCuenta); // el 'cliente' solo puede modificar el 'estado' de su cuenta. Indica cual con cuentaId
router.delete('/:cuentaId',validarCuenta, controllers.deleteCuenta); // el 'cliente' solo puede eliminar una de sus cuentas. Indica cual con cuentaId
 




module.exports = router;