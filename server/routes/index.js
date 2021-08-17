const express = require('express');
const router = express.Router();
//modelos
const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = function () {
   router.get('/', (req, res) => {
        res.render('index', {
            inicio: 'Agencia de Viajes',
            clase: 'home'
        });
    });
    router.get('/nosotros', (req, res) => {
        res.render('nosotros/index.pug', {
            nosotros : 'Sobre Nosotros'
        });
    });
    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes/index.pug',{
                pagina: 'Proximos Viajes',
                viajes
            }))
            .catch(error => console.log('Error'))
    });
    router.get('/viajes/:id', (req, res) => {
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje',{
                viaje
            }))
            .catch(error => console.log('Error'))
    });
    router.get('/testimoniales', (req, res) => {
        Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales',{
            pagina: 'testimoniales',
            testimoniales
        }))
    });
    router.post('/testimoniales', (req, res) => {
        let {nombre, correo, mensaje} = req.body;
        let errores = [];
        //validar que todos los campos esten llenos
        if(!nombre || !correo || !mensaje){
            errores.push({'mensaje': 'los 3 campos son obligatorios'})
        }
        //revisar errores si hay algo en el array error
        if(errores.length > 0){
            //muestra en la vista con errores
            res.render('testimoniales', {
                errores,
                nombre, 
                correo, 
                mensaje
            })
        }else{
            //almacenar en la base de datos
            Testimonial.create({
                nombre, 
                correo, 
                mensaje
            }).then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error));
        }
    });
    return router;
}