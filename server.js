import express from 'express'
import 'dotenv/config'
import { dbConnection } from './databases/dbConnection.js'
const app = express()
const port = 3000

dbConnection()
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))