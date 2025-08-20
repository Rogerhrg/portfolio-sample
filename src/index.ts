import express from 'express'

const app = express()

//Routing
app.get('/', (req, res) => {
    res.send('Hola Mundo con TypeScript y Express. Desde compu casa.')
})

const port = process.env.PORT || 4000

app.listen(port,() => {
    console.log('Servidor Funcionando en el puerto', port)
})