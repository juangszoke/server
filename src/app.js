const path = require('path')
const express = require('express')
const hbs = require('hbs')
const location = require('../utils/weather')

const app = express()
const port = process.env.PORT ||  3000;

//Define rutas para la configuracion de express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine y localización de rutas
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup directorio estatico para el servidor
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Juan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Juan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help user',
        name: 'juan'
    })

})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'ingresa una address'
        })
    }
    
    location(req.query.address, (location, current) => {

        if(current === null){            
            return res.send({
                error: 'localización no encontrada'
            })
        }

        console.log('temperatura actual: '+ current.temperature + ' y se siente como: ' + current.feelslike);
       
        return res.send({
            localizacion: location,
            temperatura: 'temperatura: ' + current.temperature,
            sensacion: 'sensacion: ' + current.feelslike
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'help article not found',
        name: 'juan'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'page not found',
        name: 'juan'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})