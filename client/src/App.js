import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import store from "./pages/store/store";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Cart from "./pages/cart/cart";
import Buys from "./pages/buys/buys";
import DetailPage from "./pages/detailPage/detailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/store" Component={store} />
        <Route path="/:id" Component={DetailPage} />
        <Route path="/profile" Component={Profile} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/cart" Component={Cart} />
        <Route path="/buys" Component={Buys} />
      </Routes>
    </>
  );
}

export default App;
