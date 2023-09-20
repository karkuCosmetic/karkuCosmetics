import React from "react";
import { useState } from "react";
import { fileUpload } from "../../../utils/fileUpload";
import { updateProduct } from "../../../functions/fetchingProducts";

const ProductUpload = () => {
    const [images, setImages] = useState ([]); // buffer de images
    const [imageurls, setImageurls] = useState (null); //array de urls de cloudinary

    const handleImageUpload = event => {
        const selectedFiles = event.target.files;
        setImages (prevImages => [...prevImages, ...selectedFiles]);
      };
    
    const handlerSubmitImage = async () => {
        await fileUpload (images, 'products').then (res => {
          setImageurls (res);
          updateProduct (res);
       
        });
      };
    

  return <div>
     <input
        type="file"
        name=""
        id=""
        onChange={e => handleImageUpload (e)} //input y button se usarian en el admin 
        multiple
      />
      <button onClick={handlerSubmitImage} disabled={images ? false : true}>
        Subir foto
      </button>
  </div>;
};
export default ProductUpload