import { cartModel } from "../../../databases/models/cart.model.js";
import { orderModel } from "../../../databases/models/order.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import { catchError } from "../../middleware/errorHandle.js";

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

export {
    createCashOrder
}