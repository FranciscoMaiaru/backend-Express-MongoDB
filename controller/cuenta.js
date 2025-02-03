const {Cuenta} = require('../models/cuentas');

const controllers = {
    newCuenta: async (req,res) => {
        try {
            // controlar si un cliente ya tiene una cuenta de ese tipo. Puede ser una validacion middleware antes 
            req.body.clienteId = req.user.clienteId;
            req.body.saldo = 0;
            const fecha = new Date();
            req.body.fecha_apertura = fecha.toLocaleDateString('en-GB');
            console.log(req.body);
            const cuenta = new Cuenta(req.body);
            await cuenta.save();
            res.status(201).json(cuenta);
            // agregar la cuenta al cliente , para usarla despues facil desde req.user.cuentas
        } catch (error) {
            res.status(501).json({
                msg: "No se puede crear la cuenta",
                error
            })
        }
    },
    readCuenta: async (req,res) => {
        
            const clienteId = req.user.clienteId;
            console.log(clienteId);
            const camposPermitidos = ['tipo_cuenta','saldo','saldoMin','saldoMax','estado']  ;
            const filtro = {};
            for (const key of camposPermitidos) {
                if (req.query[key]) {
                    filtro[key] = req.query[key];
                }
            }
            filtro.clienteId = clienteId;
               
            if (filtro.saldoMin || filtro.saldoMax) {
                delete filtro.saldo;
            
                if (filtro.saldoMin){
                    filtro.saldo = { $gte: saldoMin};
                };
                if (filtro.saldoMax){
                    filtro.saldo = {...filtro.saldo, $lte:saldoMax};
                };
                if (filtro.saldoMin && filtro.saldoMax) {
                    if (filtro.saldoMin > filtro.saldoMax)
                        return res.status(400).json({msg: 'El saldoMin no puede ser mayor al saldoMax'});
                };
            }
            //console.log(filtro);    
        try {
        
            const cuentas = await Cuenta.find(filtro);
            res.status(201).json(cuentas);
        } catch (error) {
            res.status(501).json({
                msg: "Error al consultar las cuentas",
                error
            })
        }
    },
    deleteCuenta: async (req,res) => {
        try {
            const eliminar = await Cuenta.deleteOne({_id: cuenta._id});
                
            if (eliminar.deletedCount > 0)
                    res.status(201).json({msg: `${actualizar.modifiedCount} cuenta eliminada con éxito`})
            
        } catch (error) {
            res.status(501).json({
                msg: "Error al eliminar  cuenta",
                error
            })
        }
    },
    updateCuenta: async (req,res) => {
        // fijarse que la cuenta pertenece al cliente logeado. o bien sus cuentas vienen en el payload y se compara, o se hace un .find Implemente para esto validarCuenta middleware antes.
        try{
            const {estado} = req.body;
            const datosActualizar = {};
            if (estado) datosActualizar.estado = estado;
            console.log(datosActualizar)
            if (!(estado === cuenta.estado)) {
                const actualizar = await Cuenta.updateOne({_id: cuenta._id}, datosActualizar);
                console.log(actualizar.modifiedCount)
                if (actualizar.modifiedCount > 0)
                    res.status(201).json({msg: `${actualizar.modifiedCount} cuenta actualizada con éxito`})
            }
            else {
                res.status(401).json({msg: `La cuenta ya se encuentra en estado ${estado}`})
            }
        } catch (error) {
            res.status(501).json({
                msg: "Error al actualizar la cuenta",
                error
            })
        }
        

    }

}

module.exports = controllers;