//importar express
const express = require('express');
const path = require('path');
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');
const bodyParser = require('body-parser');

db.authenticate()
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error));

//configuar express
const app = express();
//habilitar pub
app.set('view engine', 'pug');
//añadir a las vistas
app.set('views', path.join(__dirname, './views'));
//cargar una carpeta estatica llamada public
app.use(express.static('public'));
//estamos en desarrollo o produccion?
const config = configs[app.get('env')];
//creamos la variable
app.locals.titulo = config.nombresitio;

//habilitar body parser
app.use(bodyParser.urlencoded({extended:true}));

//cargar las rutas
app.use('/', routes());

app.listen(3000);
 
