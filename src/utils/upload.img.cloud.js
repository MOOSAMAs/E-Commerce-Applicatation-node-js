import pkg from 'cloudinary';

const { v2: cloudinary } = pkg;

export const uploadImageToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "category", // You can specify the folder here
      });
      return result.secure_url; // Get the secure URL from Cloudinary
    } catch (error) {
      throw new Error("Cloudinary upload error: " + error.message);
    }
  };
