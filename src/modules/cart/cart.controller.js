import { cartModel } from "../../../databases/models/cart.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";

function calcTotalPrice (cart) {
    let totalPrice = 0
    cart.cartItems.forEach(elm =>{
        totalPrice += elm.quantity * elm.price
    })
    cart.totalPrice = totalPrice
}

const addProductToCart = catchError(async(req , res , next)=>{
    const product = await productModel.findById(req.body.product)
    if(!product) return next(new handleError('Product Not Found' , 401))
    req.body.price = product.price
    const cartExist = await cartModel.findOne({user:req.user._id})
    if(!cartExist){
        const result = new cartModel({
            user:req.user._id,
            cartItems:[req.body],
        })
        calcTotalPrice(result)
        await result.save()
        res.status(201).json({message:'Product Added To Cart' , result})
    }
    let item = cartExist.cartItems.find((elm)=> elm.product == req.body.product)
    if(item){
        item.quantity += 1
    }else{
        cartExist.cartItems.push(req.body)
    }
    calcTotalPrice(cartExist)
    await cartExist.save()
    res.status(201).json({message:'success' , cart:cartExist})
})

export{
    addProductToCart
}