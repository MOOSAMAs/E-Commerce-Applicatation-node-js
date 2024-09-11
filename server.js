import express from 'express'
import 'dotenv/config'
import { dbConnection } from './databases/dbConnection.js'
import categoryRouter from './src/modules/category/category.router.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/api/v1/categories' , categoryRouter)

app.use('*' , (req , res)=>{
    res.json({msg:'Invalid Url' + req.originalUrl})
})
dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))