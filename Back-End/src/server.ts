import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

const app = express()

connectDB()

//CORS
app.use(cors(corsConfig))

//Leer JSON
app.use(express.json())

//Routing
app.use('/', router)

export default app