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
import About from "./pages/about/about";
import HomeAdmin from "./pages/HomeAdmin/homeAdmin";
import PageConfirm from "./pages/PageConfirm/pageconfirm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/store" Component={Store} />
        <Route path="/about" Component={About} />
        <Route path="/product/:id" Component={DetailPage} />
        <Route path="/profile" Component={Profile} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/cart" Component={Cart} />
        <Route path="/buys" Component={Buys} />
        <Route path="/confirm/:id" Component={PageConfirm} />

        <Route path="/admin" Component={HomeAdmin} />
      </Routes>
    </>
  );
}

export default App;
