const express = require('express');
const router = express.Router();
const controllers = require('../controller/controller');


/* GET users listing. */
router.get('/', controllers.myUser);
router.post('/createUser', controllers.newUser);
module.exports = router;
