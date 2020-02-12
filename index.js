const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors')

//CREAR EL SERVIDOR

const app = express();

//Conectar a la base de datos

conectarDB();

//habilitar cors
app.use(cors())

//Habilitar Express.Json

app.use(express.json({extended:true}));



//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar las rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

//Definir la Pagina principal

// app.get('/',(req,res)=>{
//     res.send('Hola Mundo')
// });



//Iniciar la app
app.listen(PORT,()=>{
    console.log(`El Servidor Esta funcionando en el puerto ${PORT}`)
})