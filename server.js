import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import { dbConnection } from './databases/dbConnection.js'
import { handleError } from './src/utils/customError.js'
import { globalError } from './src/middleware/globalError.js'
import categoryRouter from './src/modules/category/category.router.js'
import subCategoryRouter from './src/modules/subcategory/subcategory.router.js'
import brandsRouter from './src/modules/brands/brands.router.js'
import productRouter from './src/modules/products/product.router.js'
import userRouter from './src/modules/user/user.router.js'
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('uploads'))
app.use('/api/v1/categories' , categoryRouter)
app.use('/api/v1/subcategory',subCategoryRouter)
app.use('/api/v1/brands' , brandsRouter)
app.use('/api/v1/products' , productRouter)
app.use('/api/v1/users' , userRouter)

app.all('*' , (req ,res , next)=>{
    next(new handleError('invalid url' +req.originalUrl , 404))
})

app.use(globalError)

dbConnection()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))