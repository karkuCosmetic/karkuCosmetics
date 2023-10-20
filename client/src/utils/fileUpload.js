import axios from "axios";

export const fileUpload = async (images, path) => {
  try {
    let arrayUrls = [];

    await Promise.all(
      images.map(async (el) => {
        if (typeof el === "string") {
          arrayUrls.push(el);
        } else {
          const formData = new FormData();
          formData.append("file", el);
          formData.append("upload_preset", `karku_${path}`);

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dqai9sgfs/upload",
            formData
          );
          arrayUrls.push(res.data.secure_url);
        }
      })
    );

    return arrayUrls;
  } catch (error) {
    throw error;
  }
};
