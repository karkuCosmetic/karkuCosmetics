import axios from "axios";

export const Payment = async (carrito, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/payment/create-order",
      { carrito, token },
      {
        headers: { "user-token": token },
      }
    );

    const paymentUrl = response.data;

    // Redirigir al usuario al enlace de pago
    window.location.href = paymentUrl;

    // Limpiar el carrito después de la redirección
    window.localStorage.clear();
  } catch (error) {
 
    // Por ejemplo, puedes mostrar un mensaje de error al usuario:
    alert("Se produjo un error al procesar el pago. Por favor, completa todos los campos de tu perfil.");
  }
};