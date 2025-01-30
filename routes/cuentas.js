const express = require('express');
const router = express.Router();
const controllers = require('../controller/cuenta');
const transaccionesRouter = require('./transacciones');
const expressVal = require('../validations/expressValidator');

router.use('/transacciones',transaccionesRouter);

router.post('/createCuenta', expressVal.newCuenta, controllers.newCuenta);
router.get('/', expressVal.readCuenta, controllers.readCuenta); // muestra todas las cuentas de un cliente
router.put('/:cuentaId',expressVal.updateCuenta, controllers.updateCuenta); // el 'cliente' solo puede modificar el 'estado' de su cuenta. Indica cual con cuentaId
router.delete('/:cuentaId', controllers.deleteCuenta); // el 'cliente' solo puede eliminar una de sus cuentas. Indica cual con cuentaId
 
//router.delete('/:id?',controllers.deleteCuenta);  // lo mismo que el de abajo, sólo deberia poder hacerse desde el Cliente del banco, como no tienen sentido las borro.
//router.put('/',controllers.updateCuenta); // Primero lo cree, pero es ilogico , sólo deberian poder hacer update en una cuenta cuando un cliente se pasa a inactivo o cuando se crea una transaccion.



module.exports = router;