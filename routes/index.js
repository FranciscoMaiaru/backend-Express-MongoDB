const express = require('express');
const router = express.Router();

// La idea es usar una API externa para cargar la página de inicio. Es solo un ejemplo, luego no hay que interactuar con el frontend para este proyecto.
/* GET home page. */
router.get('/', async (_,res) => {
    try {
        fetch('url')
            .then()
            .then().render();
        res.status(201).json({msg: 'Pagina index cargada a traves de una API externa'});
    } catch (error) {
        res.status(501).json({msg: 'no se puedo conectar a la API externa', error});
    }
} );

module.exports = router;
