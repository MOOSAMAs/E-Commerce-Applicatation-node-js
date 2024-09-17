import express from 'express'
import 'dotenv/config'
import { dbConnection } from './databases/dbConnection.js'
import categoryRouter from './src/modules/category/category.router.js'
import { handleError } from './src/utils/customError.js'
import { globalError } from './src/middleware/globalError.js'
import subCategoryRouter from './src/modules/subcategory/subcategory.router.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/api/v1/categories' , categoryRouter)
app.use('/api/v1/subcategory',subCategoryRouter)

app.all('*' , (req ,res , next)=>{
    next(new handleError('invalid url' +req.originalUrl , 404))
})

app.use(globalError)

dbConnection()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))