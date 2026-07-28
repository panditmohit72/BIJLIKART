import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import CustomerSignup from "./pages/CustomerSignup";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import SellerRegistration from "./pages/SellerRegistration";

import SellerLogin from "./pages/SellerLogin";
import SellerDashboard from "./pages/SellerDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSellers from "./pages/AdminSellers";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCommission from "./pages/AdminCommission";
import AdminCustomers from "./pages/AdminCustomers";
import AdminSettings from "./pages/AdminSettings";
import TeamPermissions from "./pages/TeamPermissions";

import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import AccessDenied from "./pages/AccessDenied";
import Footer from "./components/Footer";
import HomeProductRows from "./components/HomeProductRows";
import ScrollToTop from "./ScrollToTop";
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
   SELLER PROTECTED ROUTE
================================= */

function SellerRoute({ children }) {
  const sellerLoggedIn =
    localStorage.getItem("bijlikartSellerAuth") === "true";

  const sellerMobile =
    localStorage.getItem("bijlikartSellerMobile");

  const sellerId =
    localStorage.getItem("bijlikartSellerId");

  if (
    !sellerLoggedIn ||
    !sellerMobile ||
    !sellerId
  ) {
    return (
      <Navigate
        to="/seller-login"
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
   MAIN APP
================================= */

function App() {
  const [cart, setCart] = useState([]);
const [searchText, setSearchText] = useState("");
const [searchCategory, setSearchCategory] = useState("all");

function handleSearch(text, category) {
  setSearchText(text);
  setSearchCategory(category);
}

function clearSearch() {
  setSearchText("");
  setSearchCategory("all");
}
  /* =================================
     ADD TO CART
  ================================= */

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

  /* =================================
     REMOVE FROM CART
  ================================= */

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

  /* =================================
     INCREASE QUANTITY
  ================================= */

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

  /* =================================
     DECREASE QUANTITY
  ================================= */

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

  /* =================================
     CUSTOMER HOME
  ================================= */

function Home() {
  return (
    <>
      <Navbar
        cartCount={cart.reduce(
          (total, item) =>
            total + item.quantity,
          0
        )}
        onSearch={handleSearch}
      />

      <Hero />

      <Products
        addToCart={addToCart}
        searchText={searchText}
        searchCategory={searchCategory}
        clearSearch={clearSearch}
      />

      <HomeProductRows
        addToCart={addToCart}
      />

      <Footer />
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
        <ScrollToTop />
        <Routes>

          {/* =====================
              CUSTOMER
          ===================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<CustomerSignup />}
          />
          <Route
  path="/product/:id"
  element={
    <ProductDetails
      addToCart={addToCart}
    />
  }
/>

<Route
  path="/search"
  element={
    <SearchResults
      addToCart={addToCart}
    />
  }
/>

<Route
  path="/cart"
  element={
    <Cart
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  }
/>

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
              />
            }
          />

          {/* =====================
              SELLER
          ===================== */}

          <Route
            path="/seller-register"
            element={
              <SellerRegistration />
            }
          />

          <Route
            path="/seller-login"
            element={
              <SellerLogin />
            }
          />

          <Route
            path="/seller"
            element={
              <SellerRoute>
                <SellerDashboard />
              </SellerRoute>
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
              OWNER ONLY
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
            path="/admin/orders"
            element={
              <OwnerRoute>
                <AdminOrders />
              </OwnerRoute>
            }
          />

          <Route
            path="/admin/commission"
            element={
              <OwnerRoute>
                <AdminCommission />
              </OwnerRoute>
            }
          />

          <Route
            path="/admin/customers"
            element={
              <OwnerRoute>
                <AdminCustomers />
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

          <Route
            path="/admin/settings"
            element={
              <OwnerRoute>
                <AdminSettings />
              </OwnerRoute>
            }
          />

          {/* =====================
              STAFF
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
              UNKNOWN URL
          ===================== */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;