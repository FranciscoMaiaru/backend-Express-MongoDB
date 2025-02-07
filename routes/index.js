const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

// La idea es usar una API externa para agregar datos en la pagina de inicio. Es solo un ejemplo, luego no hay que interactuar con el frontend para este proyecto.
// Este ejemplo solo hace un GET de una API externa trayendo info.
/* GET home page. */
router.get('/', async (_,res) => {
    try {
        const apiUrl = `https://reqres.in/api/users?page=2`;
        
        // Acá puedo desestructurar los query params y permitir al cliente elegir mediante su req, si hubiese necesidad. 

        
        const response = await axios.get(apiUrl);


        const infoAPIexterna = response.data.data.map(user => `${user.first_name} ${user.last_name}`).join(', ')
      
        let html = fs.readFileSync('public/index.html', 'utf-8');

        html = html
            .replace('<span id="APIinfo"></span>', JSON.stringify(infoAPIexterna, null, 2));
            
        res.send(html);
        
        
    
    } catch (error) {
        res.status(501).json({msg:'Error al comunicar con la API externa',error});
    }
});


module.exports = router;
