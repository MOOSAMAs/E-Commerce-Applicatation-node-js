import { cartModel } from "../../../databases/models/cart.model.js";
import { couponModel } from "../../../databases/models/coupon.model.js";
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
    if(cartExist.discount){
        cartExist.priceAfterDiscount = cartExist.totalPrice - (cartExist.totalPrice * cartExist.discount)/100
    }
    await cartExist.save()
    res.status(201).json({message:'success' , cart:cartExist})
})

const deleteProductFromCart = catchError(async(req , res , next)=>{
    const result = await cartModel.findOneAndUpdate({user:req.user._id} , {$pull: {cartItems:{_id:req.params.id}}} , {new:true})
    !result &&  next(new handleError('Product Not Found' , 405))
    calcTotalPrice(result)
    if(result.discount){
        result.priceAfterDiscount = result.totalPrice - (result.totalPrice * result.discount)/100
    }
    result &&  res.status(201).json({message:'added Successfully}' , result})
})

const applyCoupon = catchError(async(req , res , next)=>{
    const coupon = await couponModel.findOne({code:req.body.code , expireDate:{$gt:Date.now()}})
    if (!coupon) {
        return next(new handleError('Coupon is invalid or expired', 400));
    }
    const cart = await cartModel.findOne({user:req.user._id})
    cart.priceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount)/100
    cart.discount = coupon.discount
    await cart.save()
    res.status(201).json({message:'Coupon Applied' , cart})
})

const updateQuantity = catchError(async(req , res , next)=>{
    let product = await productModel.findById(req.params.id).select('price')
    if(!product) return next(new handleError('Product Not Fount' , 404))
    let cart = await cartModel.findOne({user:req.user._id})
    let item = cart.cartItems.find(elm => elm.product == req.params.id)
    if(item){
        item.quantity = req.body.quantity
    }
    calcTotalPrice(cart)
    if(cart.discount){
        cart.priceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100
    }
    await cart.save()
    res.status(201).json({message:'quantity updated' , cart})
})

export{
    addProductToCart,
    deleteProductFromCart,
    applyCoupon,
    updateQuantity
}