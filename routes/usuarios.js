//Rutas Para crear usuarios

const express = require('express');
const router = express.Router();
const usuarioControler = require('../controlers/usuarioControler');
const {check} = require('express-validator');

//Crea un usuario
// api/usuarios

router.post('/',

[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un email valido').isEmail(),
    check('password','El Password debe ser de minimo 6 caracteres').isLength({min:6})

],

usuarioControler.crearUsuario
);

//Recibir un request de tipo post



module.exports=router;

