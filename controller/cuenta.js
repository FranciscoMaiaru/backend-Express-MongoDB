const {Cuenta} = require('../models/cuentas');

const controllers = {
    newCuenta: async (req,res) => {
        try {
            const cuenta = new Cuenta(req.body);
            await cuenta.save();
            res.status(201).json(cuenta);
        } catch (error) {
            res.status(501).json({
                msg: "No se puede crear la cuenta",
                error
            })
        }
    },
    readCuenta: async (req,res) => {
        
            const cuentaId = req.params.id;
            const {tipo_cuenta,saldo,saldoMin,saldoMax,estado} = req.query; 

            const filtro = {};
        try {
            if (cuentaId){
                const existeCuenta = await Cuenta.findOne({cuentaId: cuentaId});
                if (!existeCuenta)
                    return res.status(400).json({msg: 'El id de cuenta no existe'});
                filtro.cuentaId = cuentaId;
            }
            
            if (tipo_cuenta) filtro.tipo_cuenta = tipo_cuenta;
            if (saldo) filtro.saldo = saldo;
            else{
                if (saldoMin){
                    filtro.saldo = {...filtro.saldo, $gte:saldoMin};
                }
                if (saldoMax){
                    filtro.saldo = {...filtro.saldo, $lte:saldoMax};
                }
                if (saldoMin > saldoMax)
                    return res.status(400).json({msg: 'El saldoMin no puede ser mayor al saldoMax'});
            }
            if (estado) filtro.estado = estado;

        
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
        const cuentaId = req.params.id;
        const {clienteId,estado, tipo_cuenta, limit} = req.query;

        const filtro = {};
        if (clienteId) filtro.clienteId = clienteId;
        if (estado) filtro.estado = estado;
        if (tipo_cuenta) filtro.tipo_cuenta = tipo_cuenta;
        try {
            if (cuentaId) {

                const encontrada = await Cuenta.deleteOne({ cuentaId: cuentaId });
                if (encontrada) {
                   return res.status(201).json({msg: `${encontrada.deletedCount} cuenta eliminada`});
                } else {
                   return res.status(404).json({ msg: 'No se encontro la cuenta para eliminar' });
                }

            }

            const deleteCount = await Cuenta.deleteMany(filtro).limit(limit? parseInt(limit) : 0);
            if (deleteCount.deletedCount > 0) {
                res.status(201).json({ msg: `${deleteCount.deletedCount} cuentas eliminadas` });
              } else {
                res.status(404).json({ msg: 'No se encontraron cuentas para eliminar' });
              }
        } catch (error) {
            res.status(501).json({
                msg: "Error al eliminar  cuentas",
                error
            })
        }
    },
    updateCuenta: async (req,res) => {
        const filtros = req.query;
        const {saldo,estado} = req.body;

        const datosActualizar = {};
        if (saldo) datosActualizar.saldo = saldo;
        if (estado) datosActualizar.estado = estado;
        try {
            const cuentasActualizadas = await Cuenta.updateMany(filtros, datosActualizar);

            if (cuentasActualizadas.modifiedCount > 0) {
                return res.status(200).json({ msg: `${cuentasActualizadas.modifiedCount} cuentas actualizadas` });
            } else {
                return res.status(404).json({ msg: 'No se encontraron cuentas para actualizar' });
            }
        } catch (error) {
            res.status(501).json({
                msg: "Error al actualizar cuentas",
                error
            })
        }

    }

}

module.exports = controllers;