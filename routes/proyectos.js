const express = require('express');
const router = express.Router();
const proyectoControler = require('../controlers/proyectoControler');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crea proyectos
// api/proyectos
router.post('/',
auth,
[
    check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoControler.crearProyecto
)

//Obtener todos los proyectos
router.get('/',
auth,
proyectoControler.obtenerProyectos
)


//Actualizar Proyecto via ID
router.put('/:id',auth,
[
    check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoControler.actualizarProyecto
);
//Eliminar un proyecto

router.delete('/:id',auth,
proyectoControler.eliminarProyecto
);

module.exports = router;