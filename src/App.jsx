import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/aboutus/AboutUs";
import Catalog from "./pages/catalog/Catalog";
import Contact from "./pages/contact/Contact";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import SingUp from "./pages/singup/SingUp";
import LogIn from "./pages/login/LogIn";
import SpecialBouquet from "./pages/specialbouquet/SpecialBouquet";
import RecoverAccount from "./pages/recoveraccount/RecoverAccount";
import { products } from "./data.js";
import ProductDetail from "./pages/productdetail/ProductDetail";
import { useState } from "react";
import ShoppingCart from "./pages/shoppingcart/ShoppingCart";

const App = () => {
  const [cart, setCart] = useState([]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route
          path="product/:productId"
          element={
            <ProductDetail products={products} cart={cart} setCart={setCart} />
          }
        />
        <Route
          path="shoppingcart"
          element={<ShoppingCart cart={cart} setCart={setCart} />}
        />
        <Route
          path="specialbouquet"
          element={<SpecialBouquet cart={cart} setCart={setCart} />}
        />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="singup" element={<SingUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="recoveraccount" element={<RecoverAccount />} />
      </Routes>
    </Router>
  );
};

export default App;
