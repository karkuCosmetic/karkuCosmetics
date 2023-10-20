import axios from "axios";

const deleteFile = async (publicIdToDelete) => {
  const cloudinaryApiKey = "592434557711317";
  const cloudinaryApiSecret = "Qq8iB7UpfdwBK5NYosghUYWKwn8";

  const url =
    "https://res.cloudinary.com/dqai9sgfs/image/upload/v1697757530/karku/products/lhetniuylarbeedjqw1p.jpg";
  const nombrearr = url.split("/");
  const nombre = nombrearr[nombrearr.length - 1];
  const imageUrlToDelete = nombre.split(".");

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dqai9sgfs/image/destroy?public_id=${imageUrlToDelete[0]}`;

  try {
    // const response = await fetch(cloudinaryUrl, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Basic ${btoa(
    //       `${cloudinaryApiKey}:${cloudinaryApiSecret}`
    //     )}`,
    //   },
    // });
    const response= await axios.delete(cloudinaryUrl,{headers: {
             Authorization: `Basic ${btoa(
               `${cloudinaryApiKey}:${cloudinaryApiSecret}`
             )}`
           }})

    if (response.ok) {
      const data = await response.json();
      console.log("Imagen eliminada:", data);
      // Realiza alguna acción después de la eliminación, como actualizar la interfaz de usuario.
    } else {
      console.error("Error al eliminar la imagen:", response.status);
    }
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
  }
};

export default deleteFile;
