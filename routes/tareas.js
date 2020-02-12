const express = require('express');
const router = express.Router();
const tareaControler = require('../controlers/tareaControler');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear una tarea
//api/tareas

router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareaControler.crearTarea
)

//obtener las tareas por proyecto
router.get('/',
auth,
    tareaControler.obtenerTareas
)

//Actualizar Tarea

router.put('/:id',auth,tareaControler.actualizarTarea)

//eliminar una tarea

router.delete('/:id',auth,tareaControler.eliminarTarea)

module.exports = router;