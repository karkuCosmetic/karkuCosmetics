export const AddCart = (quantity, product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("cart", cart);

  let pos = cart.findIndex((el) => el.product.title == product.title);
  if (pos > -1) {
    cart[pos] = { cant: quantity, product: product };
    localStorage.setItem("cart", JSON.stringify(cart));

} else {
    cart.push({ quantity, product });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
//

// llega un product con la cantidad, si está... actualiza su cantidad sino lo agrega al carrito 

// falta el metodo para eliminarlo 