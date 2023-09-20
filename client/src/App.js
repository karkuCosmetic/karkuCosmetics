import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";

import HomeAdmin from "./pages/Admin/Admin";
import PageConfirm from "./pages/PageConfirm/Pageconfirm";
import LoginPage from "./pages/LoginPage/LoginPage";
import { ProtectedRouteAdmin } from "./pages/ProtectedRoutes/ProtectedRouteAdmin";
import { GetDecodedCookie } from "./utils/DecodedCookie";
import { DecodedToken } from "./utils/DecodedToken";
import { getUserDetail } from "./functions/fetchingUsers";
import { useEffect, useState } from "react";
import { ProtectedRouteUser } from "./pages/ProtectedRoutes/ProtectedRouteUser";
import { Contact } from "./pages/Contact/Contact";
import DetailPage from "./pages/DetailPage/DetailPage";
import Store from "./pages/Store/Store";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import Profile from "./pages/Profile/Profile";

function App() {
  const [rol, SetRol] = useState();

  // poner el loader
  useEffect(() => {
    const token = GetDecodedCookie("cookieToken");
    if (token) {
      let { uid } = DecodedToken(token);

      const CallUsers = async (uid) => {
        const info = await getUserDetail(uid); //info hay que revisarla ahora porque se cambio y devuelve un obj condicionado o user: o admin:
        SetRol(info.Rol);
      };

      if (uid) {
        CallUsers(uid);
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/store" Component={Store} />
        <Route path="/product/:id" Component={DetailPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/confirm/:token" Component={PageConfirm} />
        <Route path="/contact" Component={Contact} />
        <Route path="/new-password/:token" Component={NewPasswordPage} />
        <Route path="/cart" Component={Cart} />

        <Route element={<ProtectedRouteUser isAllowed={true} />}>
          <Route path="/profile" Component={Profile} />
        </Route>

        <Route
          element={
            <ProtectedRouteAdmin
              isAllowed={true} //permite ingresa a esa ruta
            />
          }
        >
          <Route path="/admin" Component={HomeAdmin} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
