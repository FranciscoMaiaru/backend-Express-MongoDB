const {Cliente} = require('../models/clientes');


const controllers = {
    myCliente: async (req,res) => {
        try {
            console.log(req.user);
            const {clienteId} = req.user;
            
            if (!clienteId) {
                return res.status(400).json({ msg: "La propiedad clienteId no está presente o es inválida" });
            }
            
            const cliente = await Cliente.findOne({clienteId: clienteId}, {nombre:1,email:1,telefono:1,direccion:1,cuentas:1});
            if (cliente)
                res.status(201).json(cliente);
            else 
                res.status(404).json('No se encontro el cliente');
        } catch (error) {
            res.status(501).json({
                msg: "Error al consultar el cliente",
                error
            });
        }
        

    },
    deleteCliente: async (req,res) => {
        try {
            const {clienteId} = req.user;
            
            if (!clienteId) {
                return res.status(400).json({ msg: "La propiedad clienteId no está presente o es inválida" });
            }
            // borrar las cuentas del cliente ( y sus transacciones)
            // matar el token
            const borrarCliente = await Cliente.deleteOne({clienteId: clienteId});
            if (borrarCliente.deletedCount > 0)
                res.status(201).json(`${borrarCliente.deletedCount} cliente eliminado correctamente` );
            else 
                res.status(404).json('No se encontro el cliente');
        } catch (error) {
            res.status(501).json({
            msg: "Error al consultar el cliente",
            error 
            });
        }
    },
    updateCliente: async (req,res) => {
        try{
            const datosNuevos = req.body;

            const {clienteId} = req.user;

            const update = await Cliente.updateOne({clienteId: clienteId},{$set: datosNuevos});
            if (update.modifiedCount > 0)
                res.status(201).json('datos del cliente modificados con éxito');
            else 
                res.status(400).json('Error al actualizar el cliente');
        }  catch (error) {
            res.status(501).json({
                msg: "Error al intentar modificar un cliente",
                error 
                });
        }     
        
                
    }


};

module.exports = controllers;