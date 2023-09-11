import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Profile from "./pages/Profile/profile";
import Cart from "./pages/Cart/cart";
import Buys from "./pages/Buys/buys";
import HomeAdmin from "./pages/HomeAdmin/homeAdmin";
import PageConfirm from "./pages/PageConfirm/pageconfirm";
import LoginPage from "./pages/LoginPage/loginPage";
import { ProtectedRouteAdmin } from "./pages/ProtectedRoutes/ProtectedRouteAdmin";
import { GetDecodedCookie } from "./utils/DecodedCookie";
import { DecodedToken } from "./utils/DecodedToken";
import { getUserDetail } from "./functions/fetchingUsers";
import { useEffect, useState } from "react";
import { ProtectedRouteUser } from "./pages/ProtectedRoutes/ProtectedRouteUser";
import { Contact } from "./pages/Contact/contact";
import DetailPage from "./pages/DetailPage/detailPage";
import Store from "./pages/Store/store";

function App() {
  const [rol, SetRol] = useState();

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
        <Route path="/confirm/:id" Component={PageConfirm} />
        <Route path="/contact" Component={Contact} />

        <Route element={<ProtectedRouteUser isAllowed={true} />}>
          <Route path="/profile" Component={Profile} />
          <Route path="/cart" Component={Cart} />
          <Route path="/buys" Component={Buys} />
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
