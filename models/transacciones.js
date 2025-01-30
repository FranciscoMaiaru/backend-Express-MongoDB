const { TokenExpiredError } = require('jsonwebtoken');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema ({
    cuentaId:{
        type: String,
        required: true,
        immutable: true
    },
    cuentaDestino:{
        type: String,
        required: false,
        immutable: true
    },
    tipo:{
        type: String,
        required: true,
        immutable: true
    },   
    monto:{
        type: Number,
        required: true,
        immutable: true,
        min: 0
    }  
});

const Transaccion = mongoose.model('Transanction',storeSchema);
module.exports = {Transaccion};