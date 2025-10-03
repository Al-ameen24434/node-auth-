const image = require("../models/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");

const uploadImage = async (req, res) => {
  try {
    //check if file is present
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);
    //save image details to database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();
    res.status(201).json({
      success: true,
      message: "Image uploaded sucessfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

module.exports = { uploadImage };
