import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Store from "./pages/store/store";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Cart from "./pages/cart/cart";
import Buys from "./pages/buys/buys";
import DetailPage from "./pages/detailPage/detailPage";

import HomeAdmin from "./pages/HomeAdmin/homeAdmin";
import PageConfirm from "./pages/PageConfirm/pageconfirm";
import { ProtectedRouteAdmin } from "./pages/protectedRoutes/ProtectedRouteAdmin";
import { GetDecodedCookie } from "./utils/DecodedCookie";
import { DecodedToken } from "./utils/DecodedToken";
import { getUserDetail } from "./functions/fetchingUsers";
import { useEffect, useState } from "react";
import { ProtectedRouteUser } from "./pages/protectedRoutes/ProtectedRouteUser";

function App() {
  const [rol, SetRol] = useState();

  useEffect(() => {
    const token = GetDecodedCookie("cookieToken");
    if (token) {
      let { uid } = DecodedToken(token);

      const CallUsers = async (uid) => {
        const info = await getUserDetail(uid); //info hay que revisarla ahora porque se cambio y devuelve un obj condicionado o user: o admin:
        SetRol(info);
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
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/confirm/:id" Component={PageConfirm} />

        <Route element={<ProtectedRouteUser isAllowed={true} />}>
          <Route path="/profile" Component={Profile} />
          <Route path="/cart" Component={Cart} />
          <Route path="/buys" Component={Buys} />
        </Route>

        <Route
          element={
            <ProtectedRouteAdmin
              isAllowed={true}//permite ingresa a esa ruta 
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
