const {Cuenta} = require('../models/cuentas');

const validarCuenta = async (req,res,next) => {
    try {
        const cuenta = await Cuenta.findOne({clienteId: req.user.clienteId,cuentaId: req.params.cuentaId});
        if (!cuenta){
            return res.status(400).json({msg:'La cuenta del cliente no pudo ser accedida'});
        }
        next()
    } catch (error) {
        return res.status(501).json({
            msg:'Error al validar la cuenta',
            error
        });
    }    
}

module.exports = validarCuenta;