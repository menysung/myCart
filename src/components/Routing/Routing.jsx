import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../Authentication/LoginPage";
import Logout from "../Authentication/Logout";
import SignupPage from "../Authentication/SignupPage";
import CartPage from "../Cart/CartPage";
import HomePage from "../Home/HomePage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import ProtectedRoute from "./ProtectedRoute";

const Routing = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
