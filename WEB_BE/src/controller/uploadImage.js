import * as dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

const reg_key =
  /cloudinary:\/\/(?<api_key>\d{1,}):(?<api_secret>.{1,})@(?<cloud_name>.{1,})/;
const { cloud_name, api_key, api_secret } =
  process.env.CLOUDINARY_URL.match(reg_key).groups;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
});

const Types = Object.freeze({
  PROFILE: Symbol(0),
  SHARE: Symbol(1),
});

const uploadImage = async (image_path, type) => {
  const options = {
    width: 0,
    height: 0,
    crop: "fill",
    folder: "time_to_go_home/",
    foramt: "png",
  };
  if (type === Types.PROFILE) {
    options.width = 250;
    options.height = 250;
    options.folder += "profile/";
  } else if (type === Types.SHARE) {
    options.width = 1200;
    options.height = 600;
    options.folder += "share/";
  } else {
    throw "Type value is not valid";
  }
  try {
    const image = await cloudinary.uploader.upload(image_path, options);
    return image.secure_url;
  } catch (error) {
    throw error;
  }
};

console.log(await uploadImage("./temp/test.jpg", Types.PROFILE));

export { Types, uploadImage };
