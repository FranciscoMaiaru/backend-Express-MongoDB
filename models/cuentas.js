const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cuentaSchema = new Schema({
    cuentaId: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    clienteId: {
        type: String,
        required: true,
        immutable: true
    },
    tipo_cuenta: {
        type: String,
        required: true
    },
    saldo: {
        type: Number,
        required: true,
        min: 0
    },
    fecha_apertura:{
        type: String,
        required: true,
        immutable: true
    },
    estado: {
        type: String,
        required: true
    }

});

const Cuenta = mongoose.model('Cuenta',cuentaSchema);
module.exports = {Cuenta};