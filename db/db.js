const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
   try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log("Base de datos conectada con éxito");     
   } catch {
        console.log("Error, no se pudo conectar la Base de datos");     
   }
}

module.exports = {dbConnection};