import React from "react";
import { Navigate,Outlet } from "react-router-dom";

// Componente de ruta privada que verifica si el usuario tiene acceso
const PrivateRoute = ({ isAllowed, redirectTo, children }) => {
  if (isAllowed) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default PrivateRoute;
