const Testimonial = require('../models/Testimoniales');
exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}
exports.agregarTestimonial = async (req, res) => {
    // Validar que todos los campos esten llenos
    let {nombre, correo, mensaje} = req.body;
    let errores = [];

    if(!nombre){
        errores.push({'mensaje': 'Agrega tu Nombre'})
    }
    if(!correo){
        errores.push({'mensaje': 'Agrega tu Correo'})
    }
    if(!mensaje){
        errores.push({'mensaje': 'Agrega tu Mensaje'})
    }

    // revisar por errores
    if(errores.length > 0){
        //muestra la vista con errores
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje, 
            pagina: 'Testimoniales',
            testimoniales
        })
    } else {
        //almacenarlo en la BD
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
        
    }
}

// version vieja de peticiones sin async await 
/*
    exports.mostrarTestimoniales = (req, res) => {
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }))
}
exports.agregarTestimonial = (req, res) => {
    // Validar que todos los campos esten llenos
    let {nombre, correo, mensaje} = req.body;
    let errores = [];

    if(!nombre){
        errores.push({'mensaje': 'Agrega tu Nombre'})
    }
    if(!correo){
        errores.push({'mensaje': 'Agrega tu Correo'})
    }
    if(!mensaje){
        errores.push({'mensaje': 'Agrega tu Mensaje'})
    }

    // revisar por errores
    if(errores.length > 0){
        //muestra la vista con errores
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje
        })
    } else {
        //almacenarlo en la BD
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
        
    }
}
*/