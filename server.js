import express from 'express'
import 'dotenv/config'
import { dbConnection } from './databases/dbConnection.js'
import categoryRouter from './src/modules/category/category.router.js'
import { handleError } from './src/utils/customError.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/api/v1/categories' , categoryRouter)

app.all('*' , (req ,res , next)=>{
    next(new handleError('invalid url' +req.originalUrl , 404))
})

app.use((err , req ,res ,next)=>{
    let code = err.statusCode || 500
    res.status(code).json({statusCode:code , error:err.message , stack:err.stack})
})

dbConnection()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))