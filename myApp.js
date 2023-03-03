let express = require('express');
let app = express();
let data = require('./data.json')
let bodyParser = require('body-parser')

require('dotenv').config()

const absolutepath = __dirname + '/views/index.html'

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({
        time: req.time
    });
});

app.use((req, res, next) => {
    bodyParser.urlencoded({
        extended: false
    })
})


app.listen(process.env.PORT)
console.log(`Server listen on ${process.env.PORT}`)

/* Para servir assets */
app.use('/public', express.static(__dirname + '/public'))

/*Para utilizar parámetros dinamicos en la api */
app.get('/:param1/echo', (req, res) => {
    const param = req.params.param1
    res.json({
        echo: param
    })
})

/* Para renderizar un html */
app.get('/', (req, res) => {
    res.sendFile(absolutepath)
})

app.get('/json', (req, res) => {
    process.env.MESSAGE_STYLE === "uppercase" 
    ? res.send(data.name.toUpperCase())
    : res.send(data)
})

/*Para querys dinamicas podemos usar el método req.query */
app.get('/name/', (req, res) => {
    const {first: firstName, last: lastName } = req.query
    res.json({
        name: `${firstName} ${lastName}`
    })
})

app.post('/name', (req, res) => {
    const {first, last } = req.body
    res.json({
        name: `${firstName} ${lastName}`
    })
})





