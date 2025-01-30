const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
       return res.status(403).json({ error: 'error de autenticacion'});
    
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_KEY, (err,decoded) => {
        if (err)
            return res.status(403).json({error: 'no autorizado'});
        req.user = decoded.data; 
        next();
    });

}
module.exports = auth;