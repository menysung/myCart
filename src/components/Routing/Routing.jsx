import { Route, Routes } from "react-router-dom";

import LoginPage from "../Authentication/LoginPage";
import Logout from "../Authentication/Logout";
import SignupPage from "../Authentication/SignupPage";
import CartPage from "../Cart/CartPage";
import HomePage from "../Home/HomePage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";

const Routing = ({ addToCart, cart }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/product/:id"
        element={<SingleProductPage addToCart={addToCart} />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/cart" element={<CartPage cart={cart} />} />
      <Route path="/myorders" element={<MyOrderPage />} />
    </Routes>
  );
};

export default Routing;
