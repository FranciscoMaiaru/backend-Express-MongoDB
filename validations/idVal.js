const clienteVal = (req,res,next) => {
    const {clienteId} = req.user;
            
    if (!clienteId) {
                return res.status(400).json({ msg: "La propiedad clienteId no está presente o es inválida" });
    }

    next();
}
module.exports = clienteVal;