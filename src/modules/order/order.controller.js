import Stripe from 'stripe'
import { cartModel } from "../../../databases/models/cart.model.js";
import { orderModel } from "../../../databases/models/order.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import { catchError } from "../../middleware/errorHandle.js";

let stripe = new Stripe('sk_test_51Q8E45GC3zsE5br8lYg934re3iqH7VFNuzG2U6YWl4qSNSoTe2w8yKQx4tI5PjcP7d6edWK5n0gd04omUyNrih4o00TcBiqBzh')

const createCashOrder = catchError(async(req , res , next)=>{
    const cart = await cartModel.findById(req.params.id)
    const orderPrice = cart.priceAfterDiscount ? cart.priceAfterDiscount : cart.totalPrice
    const order = new orderModel({
        user:req.user._id,
        cartItems:cart.cartItems,
        orderPrice,
        shippingAddress:req.body.shippingAddress
    })
    await order.save()
    if(order){
    let options = cart.cartItems.map(items =>({
        updateOne:{
            filter:{_id:items.product},
            update:{$inc:{quantity:-items.quantity , sold:items.quantity}}
        }
    }))
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.status(201).json({message:"Order Created"})
}
})

const getUserOrders = catchError(async(req , res , next )=>{
    const orders = await orderModel.findOne({user:req.user._id}).populate('cartItems.product')
    res.status(200).json({message:'Your Orders' , orders})
})
const getAllOrders = catchError(async(req , res , next )=>{
    const orders = await orderModel.find({}).populate('cartItems.product')
    res.status(200).json({message:'Your Orders' , orders})
})

const checkoutSession = catchError(async(req , res , next)=>{
    const cart = await cartModel.findById(req.params.id)
    const orderTotalPrice = cart.priceAfterDiscount ? cart.priceAfterDiscount : cart.totalPrice
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'egp',
                    unit_amount:orderTotalPrice*100,
                    product_data:{
                        name:req.user.name
                    }
                },
                quantity: 1
            }
        ],
        mode:'payment',
        success_url:'http://localhost:3000/api/v1/products',
        cancel_url:'http://localhost:3000/api/v1/orders/all',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
    res.status(201).json({message:'Order Created' , session})
})


export {
    createCashOrder,
    getUserOrders,
    getAllOrders,
    checkoutSession
}