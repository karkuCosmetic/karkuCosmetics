import axios from "axios";

export const fileUpload = async (image, path )=> {
  try {
    const formData = new FormData();

    formData.append("file", image);
    // formData.append('upload_preset', `upload-${path}`)
    formData.append("upload_preset", `karku_${path}`);


    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dqai9sgfs/upload",
      formData
    );
    return res.data.secure_url;
  } catch (error) {
    throw error;
  }
};
