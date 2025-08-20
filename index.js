import express from 'express' //ESM Ecmascript Modules

const app = express()

//Routing
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(4000,() => {
    console.log('Servidor Funcionando...')
})