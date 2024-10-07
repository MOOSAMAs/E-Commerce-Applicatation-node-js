import { globalError } from "../middleware/globalError.js"
import { handleError } from "../utils/customError.js"
import addressRouter from "./address/address.router.js"
import authRouter from "./authentication/auth.router.js"
import brandsRouter from "./brands/brands.router.js"
import cartRouter from "./cart/cart.router.js"
import categoryRouter from "./category/category.router.js"
import couponsRouter from "./coupon/coupon.router.js"
import orderRouter from "./order/order.router.js"
import productRouter from "./products/product.router.js"
import reviewsRouter from "./reviews/review.router.js"
import subCategoryRouter from "./subcategory/subcategory.router.js"
import userRouter from "./user/user.router.js"
import wishlistRouter from "./wishlist/wishlist.router.js"


export function init (app){
app.use('/api/v1/categories' , categoryRouter)
app.use('/api/v1/subcategory',subCategoryRouter)
app.use('/api/v1/brands' , brandsRouter)
app.use('/api/v1/products' , productRouter)
app.use('/api/v1/users' , userRouter)
app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/reviews' , reviewsRouter)
app.use('/api/v1/wishlist' , wishlistRouter)
app.use('/api/v1/address' , addressRouter)
app.use('/api/v1/coupons' , couponsRouter)
app.use('/api/v1/carts' , cartRouter)
app.use('/api/v1/orders' , orderRouter)

app.all('*' , (req ,res , next)=>{
    next(new handleError('invalid url' +req.originalUrl , 404))
})
app.use(globalError)
}