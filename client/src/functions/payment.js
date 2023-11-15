import axios from "axios";
import Swal from "sweetalert2";

export const Payment = async (carrito, token, adressData, method) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_API}/payment/create-order`,
      { carrito, token, adressData, method },
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
    Swal.fire({
      icon: "error", // Puedes personalizar el icono
      title: "Error",
      text: "Se produjo un error al procesar el pago. Por favor, completa todos los campos de tu perfil.",
    });
  }
};

export const PaymentShipping = async (token, shipPrice,idOrder) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_API}/shippingpayment/create-order`,
      { token, shipPrice,idOrder },
      {
        headers: { "user-token": token },
      }
    );

    const paymentUrl = response.data;

    // Redirigir al usuario al enlace de pago
    window.location.href = paymentUrl;
  } catch (error) {
    // Por ejemplo, puedes mostrar un mensaje de error al usuario:
    Swal.fire({
      icon: "error", // Puedes personalizar el icono
      title: "Error",
      text: "Se produjo un error al procesar el pago.",
    });
  }
};
