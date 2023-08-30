export const AddCart = (quantity, product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   console.log("entrante", quantity, detailProduct);
  let existe=cart.find(el=>el.product===product)
  console.log(existe);
//   if(detail)
//   cart.push({ quantity, product });
//   localStorage.setItem(
//     "cart",
//     JSON.stringify([{ cant: quantity, product:product }])
//   );
//   console.log("cart", cart);

  // console.log(cant,object);
};
