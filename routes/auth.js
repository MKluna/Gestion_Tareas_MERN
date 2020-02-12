//Rutas Para autenticar usuarios

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authControler = require('../controlers/authControler');
const auth = require('../middleware/auth');

//Iniciar Sesion

// api/auth

router.post('/',
authControler.autenticarUsuario
);

//Obtiene el usuario autenticado
router.get('/',
auth,
authControler.usuarioAutenticado


);


//Recibir un request de tipo post



module.exports=router;

