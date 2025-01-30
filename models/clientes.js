const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const clienteSchema = new Schema({
    
    clienteId: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    nombre: {
        type: String,
        required: true   
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        required: true
    },
    cuentas: {
        type: [String],
        required: false
    }
})
const Cliente = mongoose.model('Cliente',clienteSchema);
module.exports = {Cliente};