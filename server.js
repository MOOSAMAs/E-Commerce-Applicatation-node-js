import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import { dbConnection } from './databases/dbConnection.js'
import { init } from './src/modules/index.routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))
init(app)

dbConnection()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))