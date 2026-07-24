import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Brands from "./components/Brands";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSellers from "./pages/AdminSellers";
import AdminProducts from "./pages/AdminProducts";
import TeamPermissions from "./pages/TeamPermissions";

import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import AccessDenied from "./pages/AccessDenied";

/* =================================
   OWNER PROTECTED ROUTE
================================= */

function OwnerRoute({ children }) {
  const ownerLoggedIn =
    localStorage.getItem("bijlikartAdminAuth") === "true";

  const ownerRole =
    localStorage.getItem("bijlikartAdminRole");

  const staffLoggedIn =
    localStorage.getItem("bijlikartStaffAuth") === "true";

  // Staff tries to open Owner page
  if (
    (!ownerLoggedIn || ownerRole !== "owner") &&
    staffLoggedIn
  ) {
    return (
      <Navigate
        to="/access-denied"
        replace
      />
    );
  }

  // Nobody logged in
  if (
    !ownerLoggedIn ||
    ownerRole !== "owner"
  ) {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  return children;
}

/* =================================
   STAFF PROTECTED ROUTE
================================= */

function StaffRoute({ children }) {
  const staffLoggedIn =
    localStorage.getItem("bijlikartStaffAuth") === "true";

  const staffRole =
    localStorage.getItem("bijlikartStaffRole");

  const allowedRoles = [
    "operations",
    "products",
    "support",
  ];

  if (
    !staffLoggedIn ||
    !allowedRoles.includes(staffRole)
  ) {
    return (
      <Navigate
        to="/staff-login"
        replace
      />
    );
  }

  return children;
}

/* =================================
   APP
================================= */

function App() {
  const [cart, setCart] = useState([]);

  /* ADD TO CART */

  function addToCart(product) {
    setCart((oldCart) => {
      const existingProduct =
        oldCart.find(
          (item) =>
            item.name === product.name
        );

      if (existingProduct) {
        return oldCart.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...oldCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    alert(
      `${product.name} added to cart!`
    );
  }

  /* REMOVE FROM CART */

  function removeFromCart(
    indexToRemove
  ) {
    setCart((oldCart) =>
      oldCart.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );
  }

  /* INCREASE QUANTITY */

  function increaseQuantity(index) {
    setCart((oldCart) =>
      oldCart.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  /* DECREASE QUANTITY */

  function decreaseQuantity(index) {
    setCart((oldCart) =>
      oldCart
        .map((item, i) =>
          i === index
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  }

  /* CUSTOMER HOME */

  function Home() {
    return (
      <>
        <Navbar />

        <Hero />

        <Brands />

        <Categories />

        <Products
          addToCart={addToCart}
        />
      </>
    );
  }

  return (
    <div
      style={{
        fontFamily:
          "Arial, sans-serif",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>

        <Routes>

          {/* =====================
              CUSTOMER WEBSITE
          ===================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          {/* SELLER */}

          <Route
            path="/seller"
            element={
              <SellerDashboard />
            }
          />

          {/* =====================
              OWNER LOGIN
          ===================== */}

          <Route
            path="/admin-login"
            element={
              <AdminLogin />
            }
          />

          {/* =====================
              STAFF LOGIN
          ===================== */}

          <Route
            path="/staff-login"
            element={
              <StaffLogin />
            }
          />

          {/* =====================
              ACCESS DENIED
          ===================== */}

          <Route
            path="/access-denied"
            element={
              <AccessDenied />
            }
          />

          {/* =====================
              OWNER ONLY ROUTES
          ===================== */}

          <Route
            path="/admin"
            element={
              <OwnerRoute>
                <AdminDashboard />
              </OwnerRoute>
            }
          />

          <Route
            path="/admin/sellers"
            element={
              <OwnerRoute>
                <AdminSellers />
              </OwnerRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <OwnerRoute>
                <AdminProducts />
              </OwnerRoute>
            }
          />

          <Route
            path="/admin/team"
            element={
              <OwnerRoute>
                <TeamPermissions />
              </OwnerRoute>
            }
          />

          {/* =====================
              STAFF ROUTES
          ===================== */}

          <Route
            path="/staff"
            element={
              <StaffRoute>
                <StaffDashboard />
              </StaffRoute>
            }
          />

          {/* =====================
              CART
          ===================== */}

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={
                  removeFromCart
                }
                increaseQuantity={
                  increaseQuantity
                }
                decreaseQuantity={
                  decreaseQuantity
                }
              />
            }
          />

          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
              />
            }
          />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;