import { productModel } from "../../databases/models/product.model.js";
import { handleError } from "../utils/customError.js";
import { catchError } from "./errorHandle.js";


export const checkProductExists = catchError(async (req, res, next) => {
    let productExists = await productModel.findById(req.body.product);
    if (!productExists) {
        return next(new handleError('Product Not Found', 404));
    }
    next(); 
})