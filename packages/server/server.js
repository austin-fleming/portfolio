const express = require('express')
const {port} = require('./config')

const app = express()

app.disable('x-powered-by') // NOTE: can remove if using helmet

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hola!'})
})

app.get('/posts', (req, res) => {
    res.status(200).json({message: 'Hello World!'})
})

app.listen(port, () => console.log('server ready on port:', port))