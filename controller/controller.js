const { User} = require('../models/users');


const controllers = {
    myIndex(req,res) {
        res.render('index', { title: 'Express' });
    },

    myUser(req,res) {
        res.json({
            name: "Jesus",
            age: 27,
            ciudad: "tu vieja"
          });
    },

    newUser: async (req,res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);

        } catch (err) {
            res.status(501).json({
                msg: "No se puede guardar el usuario en la DB, el email ya existe.",
                err,
            })
        }
    },
    
    
}

module.exports = controllers;