import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "tailwindcss/tailwind.css";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CategoryPage } from "./pages/CategoryPage";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import RefreshHandler from "./components/RefreshHandler";
import MyProfile from "./pages/MyProfile";
import WishlistPage from "./pages/WishlistPage";
import SoldItems from "./pages/SoldItems";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Search from "./pages/Search";
import SettingsPage from "./pages/SettingsPage";
import AddressSettings from "./pages/AddressSettings";
import AdminDashboard from "./pages/AdminDashboard";
import RouteTitle from "./components/RouteTitle";
import Books from "./pages/Books";
import AddressPage from "./pages/AddressPage";
import OrderDetail from "./pages/OrderDetails";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const PrivateRoute = ({ element, allowedRoles }) => {
    if (isAuthenticated == null) return null;
    if (allowedRoles && !allowedRoles.includes(isAuthenticated.role))
      return <Navigate to="/" replace />;
    return element;
  };
  return (
    <Router>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <RouteTitle />
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Signin setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUp setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/category/:categoryName"
          element={<PrivateRoute element={<CategoryPage />} />}
        />
        <Route path="/sell" element={<PrivateRoute element={<Sell />} />} />
        <Route path="/books" element={<PrivateRoute element={<Books />} />} />
        <Route
          path="/myprofile"
          element={<PrivateRoute element={<MyProfile />} />}
        />
        <Route
          path="/sold-items"
          element={<PrivateRoute element={<SoldItems />} />}
        />
        <Route
          path="/myprofile/cart"
          element={<PrivateRoute element={<Cart />} />}
        />
        <Route
          path="/myprofile/orders"
          element={<PrivateRoute element={<MyOrders />} />}
        />
        <Route
          path="/myprofile/orders/:id"
          element={<PrivateRoute element={<OrderDetail />} />}
        />
        <Route
          path="/myprofile/wishlist"
          element={<PrivateRoute element={<WishlistPage />} />}
        />
        <Route path="/search" element={<PrivateRoute element={<Search />} />} />
        <Route
          path="/settings"
          element={<PrivateRoute element={<SettingsPage />} />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/address"
          element={<PrivateRoute element={<AddressSettings />} />}
        />
        <Route
          path="/buy/address"
          element={<PrivateRoute element={<AddressPage />} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;