import express from 'express';
import router from "./routers/index.js";
import db from "./config/db.js";


//Instancia de aplicacion express
const app = express();

app.use(express.urlencoded({ extended: true }));

//Conectar bd
db.authenticate()
.then(() => console.log("Conectado a la base de datos"))
.catch(err => console.log(err));

//Puerto donde va a escuchar
const port = process.env.PORT || 3000;

app.set('view engine','pug');

app.use((req,res,next)=>{
    const year = new Date().getFullYear();
    res.locals.year = year;
    res.locals.nombreP ='Pixelzone';
    next();
})

app.use(express.static('public'));

//Agregamos el router
app.use('/', router);

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto' + port);
});
