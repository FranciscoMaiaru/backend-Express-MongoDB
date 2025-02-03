const {Cuenta} = require('../models/cuentas');

const validarTrans = async (req,res,next) => {
    try{
        console.log(req.params.cuentaId);
        const cuenta = await Cuenta.findOne({estado: "activo",cuentaId: req.params.cuentaId});
        if (!cuenta)  
            return res.status(401).json({msg:'No puede operar una cuenta inactiva'});

        if (req.body.tipo === "retiro"){
            if (cuenta.saldo < req.body.monto)  
                return res.status(401).json({msg:'El saldo en cuenta es insuficiente'});
        }
        // else if (req.body.tipo === "deposito"){ Si es deposito no hay que revisar nada mas.
            
        else if (req.body.tipo === "transferencia") {
            const destino = await Cuenta.findOne({estado: 'activo',cuentaId: req.body.cuentaDestino});
            if (!destino)  
                return res.status(401).json({msg:'No se encontró la cuenta destino o se encuentra inactiva'});
            if (cuenta.saldo < req.body.monto)  
                return res.status(401).json({msg:'El saldo en cuenta origen es insuficiente'});
        }
        next();
    } catch (error) {
        return res.status(501).json({msg: 'error al validar la transaccion', error});
    }
};

module.exports = validarTrans;