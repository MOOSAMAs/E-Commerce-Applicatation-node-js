import pkg from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { globalError } from "./globalError.js";

const { v2: cloudinary } = pkg;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const options = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName, 
      resource_type: 'image',
      public_id: (req, file) => uuidv4() + "-" + file.originalname, 
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new globalError("The file you uploaded is not an image", 400), false);
    }
  }

  return multer({ storage, fileFilter });
};


export const fileUpload = (fieldName, folderName) => options(folderName).single(fieldName);


export const uploadMixOfFiles = (arrayOfFields, folderName) => options(folderName).fields(arrayOfFields);
