const {Transaccion} = require('../models/transacciones');
const {Cuenta} = require('../models/cuentas');

const controllers = {
    newTransaccion: async (req,res) => {
        const cuentaId = req.params.cuentaId;
        const datos = req.body;
        datos.cuentaId = cuentaId;
        try {
            if (req.body.tipo === "retiro"){
                const ajuste = await Cuenta.updateOne({cuentaId},{$inc: { saldo: -req.body.monto }})
                if (ajuste.modifiedCount > 0){
                    const retiro = new Transaccion(datos);
                    await retiro.save();
                }    
            }
            else if (req.body.tipo === "deposito"){ 
                const ajuste = await Cuenta.updateOne({cuentaId},{$inc: { saldo: req.body.monto }})
                if (ajuste.modifiedCount > 0){
                    const deposito = new Transaccion(datos);
                    await deposito.save();
                }
            }
                
            else if (req.body.tipo === "transferencia") {
                await Cuenta.updateOne({cuentaId},{$inc: { saldo: -req.body.monto }})
                await Cuenta.updateOne({cuentaDestino: req.body.cuentaDestino},{$inc: { saldo: req.body.monto }} )
                const transferencia = new Transaccion(datos);
                await transferencia.save();
            }
            res.status(201).json({msg:'La transaccion se creo con éxito!'});
        } catch (error) {
            res.status(501).json({msg: 'Error al registrar la transaccion', error});
        }
    },
    readTransaccion: async (req,res) => {
        try {
            const id = req.params.cuentaId;
            const filtros = req.query;
            console.log(filtros);
            filtros = {...filtros, $or: [
                { cuentaId: id },
                { cuentaDestino: id }
            ]}
            const transacciones = await Transaccion.find(filtros);
            res.status(201).json(transacciones);
        } catch (error) {
            res.status(501).json({msg: 'Error al intentar consultar transacciones', error});
        }
    }

};

module.exports = controllers;