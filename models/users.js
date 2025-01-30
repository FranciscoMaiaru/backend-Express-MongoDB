const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

})

const User = mongoose.model('User', storeSchema);
module.exports = {User};
