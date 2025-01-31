const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenFunctions = {
    auth: (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
       return res.status(403).json({ error: 'error de autenticacion, no está el header'});
    
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'cebolla', (err,decoded) => {
        if (err)
            
            return res.status(403).json({error: 'no autorizado'});
        req.user = { clienteId: decoded.clienteId };
        next();
    });

    },
    generateToken: (cliente) => {
        const payload = {
            
                clienteId: cliente.clienteId,
                email: cliente.email
            
        };
        const secretKey = 'cebolla';   // `${process.env.PRIVATE_KEY}`
        const options = { expiresIn: '1h' };  // El token expirará en 1 hora
        return jwt.sign(payload, secretKey, options);
    }
}
module.exports = tokenFunctions;