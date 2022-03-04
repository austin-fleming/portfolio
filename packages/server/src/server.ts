import 'dotenv/config'
import express = require('express')
import config from './config'

const app = express()

app.disable('x-powered-by') // NOTE: can remove if using helmet

app.get('/', (request, response) => 
    response.status(200).json({message: 'Hola!'})
)

app.get('/hello-world', (request, response) => 
    response.status(200).json({message: 'Hello World!'})
)

app.listen(config.port, () => {
    console.log('server ready on port:', config.port)
    console.log(process.env.SUPABASE_URL)
})