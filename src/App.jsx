import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/aboutus/AboutUs";
import Catalog from "./pages/catalog/Catalog";
import Contact from "./pages/contact/Contact";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import SingUp from "./pages/singup/SingUp";
import VerifyOtpPage from "./pages/singup/VerifyOtpPage";
import LogIn from "./pages/login/LogIn";
import SpecialBouquet from "./pages/specialbouquet/SpecialBouquet";
import RecoverAccount from "./pages/recoveraccount/RecoverAccount";
import { products } from "./data.js";
import ProductDetail from "./pages/productdetail/ProductDetail";
import ShoppingCart from "./pages/shoppingcart/ShoppingCart";
import AddProductAdmin from "./pages/addProductAdmin/AddProductAdmin";
import UpdateProductAdmin from "./pages/updateProductAdmin/UpdateProductAdmin";
import OrdersAdmin from "./pages/ordersadmin/OrdersAdmin";
import Income from "./pages/income/IncomeMY.jsx";
import SupplierAdmin from "./pages/supplierAdmin/SupplierAdmin.jsx";

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
          element={<ProductDetail cart={cart} setCart={setCart} />}
        />
        <Route
          path="shoppingcart"
          element={<ShoppingCart cart={cart} setCart={setCart} />}
        />
        <Route
          path="/updateProductAdmin/:productId"
          element={<UpdateProductAdmin />}
        />
        <Route
          path="specialbouquet"
          element={<SpecialBouquet cart={cart} setCart={setCart} />}
        />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="singup" element={<SingUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="verify-otp" element={<VerifyOtpPage />} />
        <Route path="recoveraccount" element={<RecoverAccount />} />
        <Route path="addProductAdmin" element={<AddProductAdmin />} />
        <Route path="ordersAdmin" element={<OrdersAdmin />} />
        <Route path="income" element={<Income />} />
        <Route path="supplierAdmin" element={<SupplierAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
