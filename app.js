const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const {Cliente} = require('./models/clientes');
const auth = require('./validations/authVal');
const expressVal = require('./validations/expressValidator');

const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const {dbConnection} = require('./db/db');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.get('/allclients', async (req,res) => {  // Desde afuera sin auth se permite un 'GET' de clientes.
    try {
        const clientes = await Cliente.find(req.query);
        res.status(201).json(clientes);
    } catch (error) {
        res.status(501).json({
            msg: "Error al consultar los clientes",
            error
        })
    }
})

app.use('/clientes', auth, clientesRouter);    // Manejo de cuentas y transacciones decidi que lo pueda hacer un cliente logeado, sólo sobre su propias cuentas. De acá para adentro pasó por el middleware 'auth'

// logeo de un cliente
app.post('/login', expressVal.logeoCliente, async (req,res) => { 
    const {email, contraseña} = req.body;
    const cliente = await Cliente.findOne({email,contraseña});
    if (!cliente) return res.json({error: 'credenciales invalidas'});
    const access_token = generateToken(cliente);
    res.json({access_token});
})
// registro de un cliente
app.post('/registrarse',expressVal.registroCliente, async (req,res) => { 
    const {email, contraseña} = req.body;
    const cliente = await Cliente.findOne({email,contraseña});
    if (!cliente) return res.json({error: 'credenciales invalidas'});
    const access_token = generateToken(cliente);
    res.json({access_token});
})


dbConnection();

module.exports = app;
