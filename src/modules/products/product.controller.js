import slugify from "slugify";
import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";
import { deleteOne } from "../handlers/factore.handler.js";
import { productModel } from "../../../databases/models/product.model.js";
import { apiFeatures} from "../../utils/apiFeatures.js";

const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const result = new productModel(req.body);
  await result.save();
  res.status(201).json({ message: "Product Added", result });
});

const allProducts = catchError(async (req, res, next) => {
  let features = new apiFeatures(productModel.find() , req.query)
  .sort().paginate().fields().search().filter()
  const result = await features.mongooseQuery;
  res.status(201).json({ message: "all Product", page:features.page, result });
});

const oneProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  const result = await productModel.findById(id);
  res.status(201).json({ message: "Specific Product", result });
});

const updateProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.slug) req.body.slug = slugify(req.body.title);
  const result = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new handleError("Product Not Found", 401));
  result && res.status(201).json({ message: "Updated Successfully}", result });
});

const deleteProduct = deleteOne(productModel);

export { addProduct, allProducts, oneProduct, updateProduct, deleteProduct };
