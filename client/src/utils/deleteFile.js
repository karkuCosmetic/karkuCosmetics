

const cloudinaryDeleteImg = async (fileToDelete) => {
  const url="https://res.cloudinary.com/dqai9sgfs/image/upload/v1697757530/karku/products/lhetniuylarbeedjqw1p.jpg"

const nombrearr=url.split("/")
const nombre=nombrearr[nombrearr.length-1]
const [public_id]=nombre.split(".")
cloudinary.v2.uploader.destroy(public_id, options).then(callback);

const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dqai9sgfs/image/destroy"
  );


}

    export default deleteFile