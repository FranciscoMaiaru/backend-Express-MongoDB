const {body,query, validationResult} = require('express-validator');

// Every express-validation will end with this middleware, making a cleaner code
const validation = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() }); 
      }
      next(); 
}

// Reusables Vals
const passwordVal = body('contraseña').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres');
const emailVal = body('email').isEmail().withMessage('debe introducir un email válido');
const estadoCuentaVal = body('estado').isIn(['activo','inactivo']).withMessage('Estado invalido');
const nombreCliVal =body('nombre').notEmpty().withMessage('El campo no puede quedar vacio').isString().withMessage('El nombre debe ser una cadena de caracteres') ;
const telefonoCliVal =  body('telefono').isNumeric().withMessage('Telefono Invalido').notEmpty().withMessage('El campo no puede quedar vacio');
const direccionCliVal = body('direccion').notEmpty().withMessage('El campo no puede quedar vacio');
const activoCliVal = body('activo').notEmpty().withMessage('El campo no puede quedar vacio').isBoolean().withMessage('Status booleano no valido');

const expressValidator = {

    newTransaccion: [ 
        body('monto').isNumeric().withMessage('El monto debe ser un numero'),  // no controlo > 0 porque ya lo hace el modelo
        body('tipo').isIn(['transferencia','deposito','retiro']).withMessage('El tipo de transaccion es inválido'),
        validation
    ],
    updateCliente: [
        passwordVal.optional(),
        emailVal.optional(),
        nombreCliVal.optional(),
        telefonoCliVal.optional(),
        direccionCliVal.optional(),
        activoCliVal.optional(),
        validation
    ],
    updateCuenta: [
        estadoCuentaVal,
        validation
    ],
    newCuenta: [
        body('cuentaId').notEmpty().withMessage('El campo no puede quedar vacio').isString().withMessage('El nombre debe ser una cadena de caracteres'),
        body('tipo_cuenta').isIn(['ahorros','corriente']).withMessage('No es un tipo de cuenta valido'),
        estadoCuentaVal,
        validation
    ],
    // similar a este quedaria si hiciera uno para readClientes, pero no lo incluyo.
    readCuenta:[query('cuentaId').optional().isString().withMessage('el id de la cuenta debe ser una cadena de texto').notEmpty().withMessage('id de cuenta no puede estar vacio'),
        query('tipo_cuenta').optional().isIn(['ahorros','corriente']).withMessage('No es un tipo de cuenta valido'),
        query('saldo').optional().isNumeric().withMessage('el saldo debe ser un numero'),
        query('saldoMin').optional().isNumeric().withMessage('el saldo debe ser un numero'), // Extras
        query('saldoMax').optional().isNumeric().withMessage('el saldo debe ser un numero'),
        query('fecha_apertura').optional().isString().withMessage('la fecha debe ser una cadena de texto').notEmpty().withMessage('la fecha no puede estar vacia'),
        query('estado').optional().isIn(['activo','inactivo']).withMessage('No es un estado valido'),
        validation
    ],
    logeoCliente: [emailVal,passwordVal,validation],
    registroCliente: [
        body('clienteId').notEmpty().withMessage('El campo no puede quedar vacio').isString().withMessage('El nombre debe ser una cadena de caracteres'),
        emailVal,passwordVal,nombreCliVal,telefonoCliVal,direccionCliVal,activoCliVal, 
        validation
    ]

};





module.exports = expressValidator;