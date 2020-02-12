const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async(req,res)=>{

    //Revisar si hay errores 
    const errores  = validationResult(req);
    if (!errores.isEmpty()) 
    {
        return res.status(400).json({errores: errores.array()})
    }

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //Gurdar el creador via JWT
        proyecto.creador = req.usuario.id
        //guardar proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}
//Obtiene todos los proyecos del usuario actual

exports.obtenerProyectos = async (req,res)=>
{
    try {
        
        const proyectos = await Proyecto.find({creador:req.usuario.id}).sort({creado:-1});
        res.json({proyectos});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//Actualizar proyecto

exports.actualizarProyecto = async(req,res)=>{
    //Revisar si hay errores 
    const errores  = validationResult(req);
    if (!errores.isEmpty()) 
    {
        return res.status(400).json({errores: errores.array()})
    }


    //Extraer info del proyecto

    const {nombre}=req.body;
    const nuevoProyecto = {};

    if(nombre)
    {
        nuevoProyecto.nombre = nombre
    }

    try {
        
        //Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        
        //si el proyecto existe
        if (!proyecto) {
            return res.status(400).json({msg:'Proyecto No encontrado'})
        }

        //verificar el creador

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No esta autorizado'})
        }

        //actualizar
        proyecto=await Proyecto.findOneAndUpdate({_id: req.params.id},{$set:nuevoProyecto},{new:true})
        res.json({proyecto});


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
};
//Elimina un proyecto por su id

exports.eliminarProyecto=async(req,res)=>{

    try {
        //Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        
        //si el proyecto existe
        if (!proyecto) {
            return res.status(400).json({msg:'Proyecto No encontrado'})
        }

        //verificar el creador

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No esta autorizado'})
        }

        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({_id:req.params.id})
        res.json({msg:'Proyecto Eliminado'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }

}

