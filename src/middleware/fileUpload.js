import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { globalError } from './globalError.js';

export const fileUpload = (fieldName , folderName)=>{
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' +file.originalname)
    }
  })
  function fileFilter (req, file, cb) {
      if(file.mimetype.startsWith('image')){
          cb(null, true)
      }else{
          cb(new globalError('The file you upoload not an image' , 400) , false)
      }

    }
    const upload = multer({ storage , fileFilter})
    return upload.single(fieldName)
}

  