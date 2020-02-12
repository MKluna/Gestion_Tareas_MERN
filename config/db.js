const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

const conectarDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false

            //Nos evita errores en consola (falsos errores)
        });
      console.log('DB Conectada');  

    } catch (error) {
        console.log(error);
        process.exit(1)//Detener si hay errores
        console.log('HAY UN ERORRRRR')
    }
}

module.exports=conectarDB;

//video 1 modulo 21 0:48