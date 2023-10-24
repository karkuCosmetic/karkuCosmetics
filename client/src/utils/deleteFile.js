import axios from "axios";
import sha1 from "js-sha1";

const generateSignature = (publicId, apiSecret) => {
  const timestamp = new Date().getTime();
  const signatureData = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = sha1(signatureData);
  return signature;
};
  
  const deleteFile = async (publicIdToDelete) => {
    const urlimg =
      "https://res.cloudinary.com/dqai9sgfs/image/upload/v1697827491/karku/products/axcfao9axlvnghkbf45s.jpg";
    const nombrearr = urlimg.split("/");
    const nombre = nombrearr[nombrearr.length - 1];
    const imageUrlToDelete = nombre.split(".");
    const publicId = imageUrlToDelete[0];
  
    const cloudName = "dqai9sgfs";
    const timestamp = new Date().getTime();
    const apiKey = "592434557711317";
    const apiSecret = "Qq8iB7UpfdwBK5NYosghUYWKwn8";
    const signature = generateSignature(publicId, apiSecret);
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  
    try {
      const response = await axios.delete(url, {
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      });
  
      console.error(response);
    } catch (error) {
      console.error(error);
    }
  };


export default deleteFile;
