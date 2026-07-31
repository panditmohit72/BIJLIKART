import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
function SellerDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
const [menuOpen, setMenuOpen] = useState(false);

const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
const [showPhotoOptions, setShowPhotoOptions] = useState(false);

const cameraInputRef = useRef(null);
const galleryInputRef = useRef(null);
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  /* =====================================================
     PRODUCTS
  ===================================================== */
const defaultProducts = [
  {
    id: 1,
    name: "Samsung Smart TV",
    brand: "Samsung",
    category: "TV",
    model: "UA55",
    mrp: 59999,
    sellingPrice: 49999,
    stock: 8,
    warranty: "1 Year",
    description: "55 inch 4K Smart TV",
    image: "",
    images: [],
    isActive: true,
  },
  {
    id: 2,
    name: "LG Air Conditioner",
    brand: "LG",
    category: "AC",
    model: "LG-1.5T",
    mrp: 45999,
    sellingPrice: 39999,
    stock: 5,
    warranty: "1 Year",
    description: "1.5 Ton inverter air conditioner",
    image: "",
    images: [],
    isActive: true,
  },
];

const [products, setProducts] = useState(() => {
  try {
    const savedProducts = JSON.parse(
      localStorage.getItem("bijlikartSellerProducts")
    );

    if (Array.isArray(savedProducts)) {
      return savedProducts;
    }
  } catch (error) {
    console.error(error);
  }

  return defaultProducts;
});

useEffect(() => {
  localStorage.setItem(
    "bijlikartSellerProducts",
    JSON.stringify(products)
  );
}, [products]);
  
  /* =====================================================
     ORDERS
  ===================================================== */

  const demoOrders = [
    {
      id: "BK1001",
      customer: "Rahul Sharma",
      phone: "9876543210",
      product: "Samsung Smart TV",
      quantity: 1,
      amount: 49999,
      payment: "Cash on Delivery",
      address: "Krishna Nagar, Mathura, Uttar Pradesh - 281001",
      date: "24 Jul 2026",
      status: "New Order",
    },
    {
      id: "BK1002",
      customer: "Amit Verma",
      phone: "9812345678",
      product: "LG Air Conditioner",
      quantity: 1,
      amount: 39999,
      payment: "Online Paid",
      address: "Govardhan Road, Mathura, Uttar Pradesh - 281004",
      date: "24 Jul 2026",
      status: "Processing",
    },
    {
      id: "BK1003",
      customer: "Priya Agarwal",
      phone: "9765432109",
      product: "Whirlpool Refrigerator",
      quantity: 1,
      amount: 27999,
      payment: "Online Paid",
      address: "Holi Gate, Mathura, Uttar Pradesh - 281001",
      date: "23 Jul 2026",
      status: "Delivered",
    },
  ];

  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("bijlikartOrders")
      );

      if (Array.isArray(savedOrders) && savedOrders.length > 0) {
        const savedIds = new Set(
          savedOrders.map((order) => order.id)
        );

        const remainingDemoOrders = demoOrders.filter(
          (order) => !savedIds.has(order.id)
        );

        return [...savedOrders, ...remainingDemoOrders];
      }
    } catch (error) {
      console.error("Unable to load BIJLIKART orders:", error);
    }

    return demoOrders;
  });

  /* =====================================================
     PRODUCT FORM
  ===================================================== */

  const emptyForm = {
    name: "",
    brand: "",
    category: "",
    model: "",
    mrp: "",
    sellingPrice: "",
    stock: "",
    warranty: "",
    description: "",
    image: "",
    images: [],
  };

  const [form, setForm] = useState(emptyForm);

  const [editingProductId, setEditingProductId] =
    useState(null);

  /* =====================================================
     SHOP PROFILE
  ===================================================== */

  const [shopProfile, setShopProfile] = useState({
  shopName:
    localStorage.getItem("bijlikartSellerName") ||
    "Demo Electronics Store",

  ownerName:
    localStorage.getItem("bijlikartSellerOwnerName") ||
    "Demo Seller",

  mobile:
    localStorage.getItem("bijlikartSellerMobile") ||
    "9876543210",

  alternateMobile: "",
  email: "seller@bijlikart.in",

  gstin: "09ABCDE1234F1Z5",

  address: "Krishna Nagar, Near Main Market",
  city: "Mathura",
  state: "Uttar Pradesh",
  pincode: "281001",

  description:
    "Trusted electronics retailer offering TVs, ACs, refrigerators, washing machines and other home appliances.",

  accountHolder:
    localStorage.getItem("bijlikartSellerName") ||
    "Demo Electronics Store",

  bankName: "State Bank of India",
  accountNumber: "XXXXXXXX1234",
  ifsc: "SBIN0001234",
  upiId: "demostore@upi",
});

  const [profileForm, setProfileForm] =
    useState(shopProfile);

  const [editingProfile, setEditingProfile] =
    useState(false);

  /* =====================================================
     PRODUCT FORM FUNCTIONS
  ===================================================== */

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImages(e) {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== files.length) {
      alert("Please select image files only.");
      e.target.value = "";
      return;
    }

    const remainingSlots = 5 - (form.images?.length || 0);

    if (remainingSlots <= 0) {
      alert("You can upload maximum 5 product photos.");
      e.target.value = "";
      return;
    }

    const selectedFiles = imageFiles.slice(0, remainingSlots);

    if (imageFiles.length > remainingSlots) {
      alert(
        `Only ${remainingSlots} more photo${
          remainingSlots === 1 ? "" : "s"
        } can be added. Maximum 5 photos are allowed.`
      );
    }

    Promise.all(
      selectedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    )
      .then((newImages) => {
        setForm((prev) => {
          const images = [
            ...(prev.images || []),
            ...newImages,
          ].slice(0, 5);

          return {
            ...prev,
            images,
            image: images[0] || "",
          };
        });
      })
      .catch(() => {
        alert("Unable to read one of the selected images.");
      });

    e.target.value = "";
  }

  function removeProductImage(index) {
    setForm((prev) => {
      const images = (prev.images || []).filter(
        (_, imageIndex) => imageIndex !== index
      );

      return {
        ...prev,
        images,
        image: images[0] || "",
      };
    });
  }

  function makeMainProductImage(index) {
    setForm((prev) => {
      const images = [...(prev.images || [])];

      if (!images[index]) return prev;

      const [selected] = images.splice(index, 1);
      images.unshift(selected);

      return {
        ...prev,
        images,
        image: selected,
      };
    });
  }

  function createListingWithAI() {
    if (!form.name && !form.brand && !form.model) {
      alert(
        "Enter at least Product Name, Brand or Model Number first."
      );
      return;
    }

    const productName =
      form.name ||
      `${form.brand || ""} ${form.model || ""}`.trim();

    const category =
      form.category ||
      (/tv|television/i.test(productName)
        ? "TV"
        : /air conditioner|\bac\b/i.test(productName)
        ? "AC"
        : /fridge|refrigerator/i.test(productName)
        ? "Fridge"
        : /washing/i.test(productName)
        ? "Washing Machine"
        : /laptop|notebook/i.test(productName)
        ? "Laptop"
        : /mobile|phone|smartphone/i.test(productName)
        ? "Mobile"
        : /headphone|earphone/i.test(productName)
        ? "Headphones"
        : /speaker/i.test(productName)
        ? "Speaker"
        : "Other");

    setForm((prev) => ({
      ...prev,
      category: prev.category || category,
      description:
        prev.description ||
        `${productName} from ${prev.brand || "a trusted brand"}. ` +
          "Add key specifications, included accessories, installation details and warranty information before publishing.",
    }));

    alert(
      "✨ Demo AI listing prepared! Category and description suggestions were added. Real AI generation will be connected with the backend."
    );
  }

  function saveProduct(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.brand ||
      !form.category ||
      !form.mrp ||
      !form.sellingPrice ||
      form.stock === ""
    ) {
      alert("Please fill all required product details.");
      return;
    }

    if (Number(form.sellingPrice) > Number(form.mrp)) {
      alert("Selling price cannot be greater than MRP.");
      return;
    }

    if (Number(form.stock) < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    if (editingProductId) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                name: form.name,
                brand: form.brand,
                category: form.category,
                model: form.model,
                mrp: Number(form.mrp),
                sellingPrice: Number(
                  form.sellingPrice
                ),
                stock: Number(form.stock),
                warranty: form.warranty,
                description: form.description,
                image:
                  form.images?.[0] ||
                  form.image ||
                  "",
                images:
                  form.images?.length
                    ? form.images
                    : form.image
                    ? [form.image]
                    : [],
              }
            : product
        )
      );

      setForm(emptyForm);
      setEditingProductId(null);

      alert("Product updated successfully!");

      setActivePage("products");

      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      brand: form.brand,
      category: form.category,
      model: form.model,
      mrp: Number(form.mrp),
      sellingPrice: Number(form.sellingPrice),
      stock: Number(form.stock),
      warranty: form.warranty,
      description: form.description,
      price: Number(form.sellingPrice),
oldPrice: Number(form.mrp),

shop: shopProfile.shopName,
seller: shopProfile.shopName,

location: shopProfile.city,

delivery: "FREE Delivery",

discount:
  Math.round(
    ((Number(form.mrp) - Number(form.sellingPrice)) /
      Number(form.mrp)) *
      100
  ) + "% OFF",

rating: 5,
reviews: 0,
reviewsCount: 0,

highlights: [
  form.brand,
  form.model,
  form.warranty,
].filter(Boolean),

specifications: {
  Brand: form.brand,
  Model: form.model,
  Warranty: form.warranty,
},
      image:
        form.images?.[0] ||
        form.image ||
        "",
      images:
        form.images?.length
          ? form.images
          : form.image
          ? [form.image]
          : [],
      isActive: true,
    };

    setProducts((prev) => [
      ...prev,
      newProduct,
    ]);

    setForm(emptyForm);

    alert("Product added successfully!");

    setActivePage("products");
  }

  function editProduct(product) {
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      model: product.model || "",
      mrp: product.mrp,
      sellingPrice: product.sellingPrice,
      stock: product.stock,
      warranty: product.warranty || "",
      description: product.description || "",
      image: product.image || "",
      images:
        product.images?.length
          ? product.images
          : product.image
          ? [product.image]
          : [],
    });

    setEditingProductId(product.id);

    setActivePage("add");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setForm(emptyForm);
    setEditingProductId(null);
    setActivePage("products");
  }

  function toggleProductStatus(id) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              isActive: !product.isActive,
            }
          : product
      )
    );
  }

  function deleteProduct(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((prev) =>
      prev.filter(
        (product) => product.id !== id
      )
    );
  }

  /* =====================================================
     ORDER FUNCTIONS
  ===================================================== */

  function updateOrderStatus(
    orderId,
    newStatus
  ) {
    setOrders((prev) => {
      const updatedOrders = prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      );

      try {
        localStorage.setItem(
          "bijlikartOrders",
          JSON.stringify(updatedOrders)
        );
      } catch (error) {
        console.error(
          "Unable to save BIJLIKART order status:",
          error
        );
      }

      return updatedOrders;
    });
  }

  function acceptOrder(orderId) {
    const confirmed = window.confirm(
      `Accept order ${orderId}?`
    );

    if (!confirmed) return;

    updateOrderStatus(
      orderId,
      "Processing"
    );
  }

  function rejectOrder(orderId) {
    const confirmed = window.confirm(
      `Reject order ${orderId}?`
    );

    if (!confirmed) return;

    updateOrderStatus(
      orderId,
      "Rejected"
    );
  }

  function markReady(orderId) {
    updateOrderStatus(
      orderId,
      "Ready for Delivery"
    );
  }

  function markDelivered(orderId) {
    const confirmed = window.confirm(
      `Mark order ${orderId} as delivered?`
    );

    if (!confirmed) return;

    updateOrderStatus(
      orderId,
      "Delivered"
    );
  }

  /* =====================================================
     PROFILE FUNCTIONS
  ===================================================== */

  function handleProfileChange(e) {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function startProfileEdit() {
    setProfileForm(shopProfile);
    setEditingProfile(true);
  }

  function cancelProfileEdit() {
    setProfileForm(shopProfile);
    setEditingProfile(false);
  }

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    localStorage.removeItem("bijlikartSellerAuth");
    localStorage.removeItem("bijlikartSellerMobile");
    localStorage.removeItem("bijlikartSellerId");
    localStorage.removeItem("bijlikartSellerName");

    navigate("/seller-login", { replace: true });
  }

  function saveShopProfile(e) {
    e.preventDefault();

    if (
      !profileForm.shopName ||
      !profileForm.ownerName ||
      !profileForm.mobile ||
      !profileForm.address ||
      !profileForm.city ||
      !profileForm.state ||
      !profileForm.pincode
    ) {
      alert(
        "Please fill all required shop details."
      );

      return;
    }

    if (
      profileForm.mobile.length !== 10
    ) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }

    if (
      profileForm.pincode.length !== 6
    ) {
      alert(
        "Please enter a valid 6-digit pincode."
      );

      return;
    }

    setShopProfile(profileForm);

    setEditingProfile(false);

    alert(
      "Shop profile updated successfully!"
    );
  }

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const money = (amount) =>
    `₹${Number(amount).toLocaleString(
      "en-IN"
    )}`;

  const newOrdersCount = orders.filter(
    (order) =>
      order.status === "New Order"
  ).length;

  const processingOrdersCount =
    orders.filter(
      (order) =>
        order.status === "Processing" ||
        order.status ===
          "Ready for Delivery"
    ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.status === "Delivered"
  );

  const deliveredSales =
    deliveredOrders.reduce(
      (total, order) =>
        total + order.amount,
      0
    );

  const platformCommission =
    deliveredSales * 0.1;

  const sellerSettlement =
    deliveredSales -
    platformCommission;

  /* =====================================================
     SIDEBAR MENU
  ===================================================== */

  const menuButton = (
    page,
    text
  ) => (
    <button
      onClick={() => {
  setActivePage(page);

  if (page !== "add") {
    setEditingProductId(null);
    setForm(emptyForm);
  }

  if (isMobile) {
    setMenuOpen(false);
  }
}}
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "8px",
        border: "none",
        borderRadius: "8px",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "15px",

        background:
          activePage === page
            ? "#2563eb"
            : "transparent",

        color:
          activePage === page
            ? "white"
            : "#dbeafe",
      }}
    >
      {text}
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f5f7fb",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
  style={{
    width: "240px",
    minHeight: "100vh",
    background: "#0f2f5f",
    padding: "25px 18px",
    color: "white",
    boxSizing: "border-box",

    position: isMobile ? "fixed" : "relative",
    left: isMobile ? (menuOpen ? "0" : "-250px") : "0",
    top: 0,
    zIndex: 999,
    transition: "all 0.3s ease",
  }}
>
        <h2
          style={{
            marginBottom: "3px",
          }}
        >
          ⚡ BIJLIKART
        </h2>

        <p
          style={{
            fontSize: "12px",
            color: "#bfdbfe",
            marginBottom: "30px",
          }}
        >
          Seller Panel
        </p>

        {menuButton(
          "dashboard",
          "📊 Dashboard"
        )}

        {menuButton(
          "add",
          "➕ Add Product"
        )}

        {menuButton(
          "products",
          "📦 My Products"
        )}

        {menuButton(
          "orders",
          "🛍️ Orders"
        )}

        {menuButton(
          "earnings",
          "💰 Earnings"
        )}

        {menuButton(
          "profile",
          "🏪 Shop Profile"
        )}

        <button
          onClick={() =>
            navigate("/")
          }
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "30px",
            border:
              "1px solid #93c5fd",
            borderRadius: "8px",
            background:
              "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Customer Website
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "10px",
            border: "1px solid #f87171",
            borderRadius: "8px",
            background: "transparent",
            color: "#fecaca",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Seller Logout
        </button>
      </aside>

      {/* =================================================
          MAIN AREA
      ================================================= */}
      {isMobile && (
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    style={{
      position: "fixed",
      top: "15px",
      left: "15px",
      zIndex: 1000,
      width: "45px",
      height: "45px",
      border: "none",
      borderRadius: "8px",
      background: "#2563eb",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    }}
  >
    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
  </button>
)}
      {isMobile && menuOpen && (
  <div
    onClick={() => setMenuOpen(false)}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      zIndex: 998,
    }}
  />
)}
      <main
        style={{
  flex: 1,
  overflowX: "auto",
  width: "100%",
  padding: isMobile ? "75px 15px 20px" : "35px",
  transition: "0.3s",
}}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
             justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
            marginBottom: "30px",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                marginBottom: "5px",
              }}
            >
              Seller Dashboard
            </h1>

            <p
              style={{
                color: "#666",
              }}
            >
              Welcome to your BIJLIKART
              seller panel.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "12px 18px",
              borderRadius: "10px",
              whiteSpace: "nowrap",
            width: isMobile ? "100%" : "auto",
            boxSizing: "border-box",
            }}
          >
            🏪{" "}
            <strong>
              {shopProfile.shopName}
            </strong>
          </div>
        </div>

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {activePage ===
          "dashboard" && (
          <>
            <div
              style={{
                display: "grid",
               gridTemplateColumns: isMobile
                ? "1fr" 
                : "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "20px",
              }}
            >
              <StatCard
                title="Total Products"
                value={
                  products.length
                }
                icon="📦"
              />

              <StatCard
                title="New Orders"
                value={
                  newOrdersCount
                }
                icon="🛍️"
              />

              <StatCard
                title="Processing"
                value={
                  processingOrdersCount
                }
                icon="⚙️"
              />

              <StatCard
                title="Delivered Sales"
                value={money(
                  deliveredSales
                )}
                icon="💰"
              />

              <StatCard
                title="Store Rating"
                value="4.8 ⭐"
                icon="⭐"
              />
            </div>

            <div
              style={{
                background: "white",
                marginTop: "30px",
                padding: "25px",
                borderRadius: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  gap: "15px",
                }}
              >
                <h2>
                  Recent Orders
                </h2>

                <button
                  onClick={() =>
                    setActivePage(
                      "orders"
                    )
                  }
                  style={
                    blueButtonStyle
                  }
                >
                  Manage Orders →
                </button>
              </div>

              <SimpleOrderTable
                orders={orders.slice(
                  0,
                  3
                )}
                money={money}
              />
            </div>
          </>
        )}

        {/* =================================================
            ADD / EDIT PRODUCT
        ================================================= */}

        {activePage === "add" && (
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                gap: "15px",
              }}
            >
              <div>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom:
                      "6px",
                  }}
                >
                  {editingProductId
                    ? "✏️ Edit Product"
                    : "➕ Add New Product"}
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",
                    marginTop: 0,
                  }}
                >
                  {editingProductId
                    ? "Update your product information."
                    : "Add a product to your BIJLIKART store."}
                </p>
              </div>

              {editingProductId && (
                <span
                  style={{
                    background:
                      "#fef3c7",
                    color:
                      "#92400e",
                    padding:
                      "8px 12px",
                    borderRadius:
                      "8px",
                    fontWeight:
                      "bold",
                    fontSize:
                      "13px",
                  }}
                >
                  Editing Product
                </span>
              )}
            </div>

            <form
              onSubmit={
                saveProduct
              }
            >
              <div style={photoUploadCardStyle}>
                <div style={photoUploadHeaderStyle}>
                  <div>
                    <label style={photoUploadTitleStyle}>
                      Product Photos
                    </label>

                    <p style={photoUploadTextStyle}>
                      Upload up to 5 real product photos. The first
                      photo becomes the main image and all photos can
                      appear in the customer product gallery.
                    </p>
                  </div>

                  <span style={photoCountStyle}>
                    {(form.images || []).length}/5
                  </span>
                </div>

                <>
  <input
    ref={cameraInputRef}
    type="file"
    accept="image/*"
    capture="environment"
    multiple
    onChange={handleImages}
    style={{ display: "none" }}
  />

  <input
    ref={galleryInputRef}
    type="file"
    accept="image/*"
    multiple
    onChange={handleImages}
    style={{ display: "none" }}
  />

  <div
    style={photoPickerStyle}
    onClick={() => setShowPhotoOptions(true)}
  >
    <span style={photoPickerIconStyle}>📸</span>

    <strong>Choose Product Photos</strong>

    <small>
      JPG, PNG or WEBP • Maximum 5 photos
    </small>
  </div>
</>

                {(form.images || []).length > 0 && (
                  <div style={photoPreviewGridStyle}>
                    {form.images.map((image, index) => (
                      <div
                        key={`${image.slice(0, 30)}-${index}`}
                        style={photoPreviewCardStyle}
                      >
                        <div style={photoImageBoxStyle}>
                          <img
                            src={image}
                            alt={`Product preview ${index + 1}`}
                            style={photoPreviewImageStyle}
                          />

                          {index === 0 && (
                            <span style={mainPhotoBadgeStyle}>
                              MAIN
                            </span>
                          )}

                          <span style={photoNumberBadgeStyle}>
                            {index + 1}
                          </span>
                        </div>

                        <div style={photoActionRowStyle}>
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                makeMainProductImage(index)
                              }
                              style={makeMainButtonStyle}
                            >
                              Make Main
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              removeProductImage(index)
                            }
                            style={removePhotoButtonStyle}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={aiListingBoxStyle}>
                  <div>
                    <strong style={aiListingTitleStyle}>
                      ✨ AI Listing Assistant
                    </strong>

                    <p style={aiListingTextStyle}>
                      Enter basic product details and BIJLIKART can
                      suggest category and listing text. Backend AI
                      will later automate richer specifications.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={createListingWithAI}
                    style={aiButtonStyle}
                  >
                    ✨ Create Listing with AI
                  </button>
                </div>
              </div>

              <div
                style={
                  formGridStyle
                }
              >
                <FormField
                  label="Product Name *"
                  name="name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Samsung 55 inch Smart TV"
                />

                <FormField
                  label="Brand *"
                  name="brand"
                  value={form.brand}
                  onChange={
                    handleChange
                  }
                  placeholder="Samsung"
                />

                <div>
                  <label
                    style={
                      labelStyle
                    }
                  >
                    Category *
                  </label>

                  <select
                    name="category"
                    value={
                      form.category
                    }
                    onChange={
                      handleChange
                    }
                    style={
                      inputStyle
                    }
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="TV">
                      TV
                    </option>

                    <option value="AC">
                      Air Conditioner
                    </option>

                    <option value="Fridge">
                      Refrigerator
                    </option>

                    <option value="Washing Machine">
                      Washing Machine
                    </option>

                    <option value="Laptop">
                      Laptop
                    </option>

                    <option value="Mobile">
                      Mobile
                    </option>

                    <option value="Headphones">
                      Headphones
                    </option>

                    <option value="Speaker">
                      Speaker
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <FormField
                  label="Model Number"
                  name="model"
                  value={form.model}
                  onChange={
                    handleChange
                  }
                  placeholder="UA55DU7700"
                />

                <FormField
                  label="MRP ₹ *"
                  name="mrp"
                  type="number"
                  value={form.mrp}
                  onChange={
                    handleChange
                  }
                  placeholder="59999"
                />

                <FormField
                  label="Selling Price ₹ *"
                  name="sellingPrice"
                  type="number"
                  value={
                    form.sellingPrice
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="49999"
                />

                <FormField
                  label="Available Stock *"
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={
                    handleChange
                  }
                  placeholder="10"
                />

                <div>
                  <label
                    style={
                      labelStyle
                    }
                  >
                    Warranty
                  </label>

                  <select
                    name="warranty"
                    value={
                      form.warranty
                    }
                    onChange={
                      handleChange
                    }
                    style={
                      inputStyle
                    }
                  >
                    <option value="">
                      Select Warranty
                    </option>

                    <option value="No Warranty">
                      No Warranty
                    </option>

                    <option value="6 Months">
                      6 Months
                    </option>

                    <option value="1 Year">
                      1 Year
                    </option>

                    <option value="2 Years">
                      2 Years
                    </option>

                    <option value="3 Years">
                      3 Years
                    </option>

                    <option value="5 Years">
                      5 Years
                    </option>
                  </select>
                </div>
              </div>

              <label
                style={labelStyle}
              >
                Product Description
              </label>

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                placeholder="Write important product features, specifications and installation information."
                rows="5"
                style={{
                  ...inputStyle,
                  resize:
                    "vertical",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap:
                    "wrap",
                  marginTop:
                    "10px",
                }}
              >
                <button
                  type="submit"
                  style={
                    blueButtonStyle
                  }
                >
                  {editingProductId
                    ? "💾 Save Changes"
                    : "➕ Add Product"}
                </button>

                {editingProductId && (
                  <button
                    type="button"
                    onClick={
                      cancelEdit
                    }
                    style={
                      grayButtonStyle
                    }
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* =================================================
            MY PRODUCTS
        ================================================= */}

        {activePage ===
          "products" && (
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                gap: "20px",
                flexWrap:
                  "wrap",
              }}
            >
              <div>
                <h2>
                  📦 My Products
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",
                  }}
                >
                  Manage your
                  BIJLIKART product
                  listings.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProductId(
                    null
                  );

                  setForm(
                    emptyForm
                  );

                  setActivePage(
                    "add"
                  );
                }}
                style={
                  blueButtonStyle
                }
              >
                + Add Product
              </button>
            </div>

            <div
              style={{
                overflowX:
                  "auto",
              }}
            >
              <table
                style={
                  tableStyle
                }
              >
                <thead>
                  <tr>
                    <th
                      style={
                        cellStyle
                      }
                    >
                      Image
                    </th>

                    <th
                      style={
                        cellStyle
                      }
                    >
                      Product
                    </th>

                    <th
                      style={
                        cellStyle
                      }
                    >
                      Category
                    </th>

                    <th
                      style={
                        cellStyle
                      }
                    >
                      MRP
                    </th>

                    <th
                      style={
                        cellStyle
                      }
                    >
                      Price
                    </th>

                    <th
                      style={
                        cellStyle
                      }
                    >
                      Stock
                    </th>

                    <th
                      style={
                        cellStyle
                      }
                    >
                      Status
                    </th>

                    <th
                      style={
                        cellStyle
                      }
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map(
                    (product) => (
                      <tr
                        key={
                          product.id
                        }
                        style={{
                          opacity:
                            product.isActive
                              ? 1
                              : 0.6,
                        }}
                      >
                        <td
                          style={
                            cellStyle
                          }
                        >
                          {product.image ? (
                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                              style={{
                                width:
                                  "65px",
                                height:
                                  "55px",
                                objectFit:
                                  "contain",
                                border:
                                  "1px solid #ddd",
                                borderRadius:
                                  "6px",
                              }}
                            />
                          ) : (
                            <div
                              style={
                                imagePlaceholder
                              }
                            >
                              📦
                            </div>
                          )}

                          {(product.images?.length || 0) > 1 && (
                            <div
                              style={{
                                marginTop: "5px",
                                fontSize: "11px",
                                color: "#64748b",
                                fontWeight: "bold",
                              }}
                            >
                              📷 {product.images.length} photos
                            </div>
                          )}
                        </td>

                        <td
                          style={
                            cellStyle
                          }
                        >
                          <strong>
                            {
                              product.name
                            }
                          </strong>

                          <div
                            style={{
                              fontSize:
                                "12px",
                              color:
                                "#64748b",
                              marginTop:
                                "5px",
                            }}
                          >
                            {
                              product.brand
                            }

                            {product.model
                              ? ` • ${product.model}`
                              : ""}
                          </div>
                        </td>

                        <td
                          style={
                            cellStyle
                          }
                        >
                          {
                            product.category
                          }
                        </td>

                        <td
                          style={
                            cellStyle
                          }
                        >
                          <span
                            style={{
                              textDecoration:
                                "line-through",
                              color:
                                "#777",
                            }}
                          >
                            {money(
                              product.mrp
                            )}
                          </span>
                        </td>

                        <td
                          style={
                            cellStyle
                          }
                        >
                          <strong
                            style={{
                              color:
                                "#2563eb",
                            }}
                          >
                            {money(
                              product.sellingPrice
                            )}
                          </strong>
                        </td>

                        <td
                          style={
                            cellStyle
                          }
                        >
                          {
                            product.stock
                          }
                        </td>

                        <td
                          style={
                            cellStyle
                          }
                        >
                          {product.stock ===
                          0 ? (
                            <span
                              style={{
                                color:
                                  "#dc2626",
                              }}
                            >
                              🔴 Out of
                              Stock
                            </span>
                          ) : product.isActive ? (
                            <span
                              style={{
                                color:
                                  "#16a34a",
                              }}
                            >
                              🟢 Active
                            </span>
                          ) : (
                            <span
                              style={{
                                color:
                                  "#64748b",
                              }}
                            >
                              ⚫ Inactive
                            </span>
                          )}
                        </td>

                        <td
                          style={
                            cellStyle
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              gap: "7px",
                              flexWrap:
                                "wrap",
                            }}
                          >
                            <button
                              onClick={() =>
                                editProduct(
                                  product
                                )
                              }
                              style={
                                smallBlueButton
                              }
                            >
                              ✏️ Edit
                            </button>

                            <button
                              onClick={() =>
                                toggleProductStatus(
                                  product.id
                                )
                              }
                              disabled={
                                product.stock ===
                                0
                              }
                              style={{
                                ...smallButton,

                                background:
                                  product.stock ===
                                  0
                                    ? "#cbd5e1"
                                    : product.isActive
                                    ? "#64748b"
                                    : "#16a34a",

                                cursor:
                                  product.stock ===
                                  0
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              {product.isActive
                                ? "⏸ Inactive"
                                : "▶ Activate"}
                            </button>

                            <button
                              onClick={() =>
                                deleteProduct(
                                  product.id
                                )
                              }
                              style={
                                smallRedButton
                              }
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================================================
            ORDERS
        ================================================= */}

        {activePage ===
          "orders" && (
          <div>
            <h2>
              🛍️ Customer Orders
            </h2>

            <p
              style={{
                color: "#64748b",
              }}
            >
              Accept orders and
              manage their delivery
              status.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "15px",
                margin:
                  "25px 0",
              }}
            >
              <MiniStat
                title="Total Orders"
                value={
                  orders.length
                }
              />

              <MiniStat
                title="New Orders"
                value={
                  newOrdersCount
                }
              />

              <MiniStat
                title="Processing"
                value={
                  processingOrdersCount
                }
              />

              <MiniStat
                title="Delivered"
                value={
                  deliveredOrders.length
                }
              />
            </div>

            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              {orders.map(
                (order) => (
                  <div
                    key={order.id}
                    style={
                      orderCardStyle
                    }
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        gap: "20px",
                        flexWrap:
                          "wrap",
                        paddingBottom:
                          "18px",
                        borderBottom:
                          "1px solid #e5e7eb",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            marginTop:
                              0,
                          }}
                        >
                          Order #
                          {order.id}
                        </h3>

                        <OrderStatus
                          status={
                            order.status
                          }
                        />

                        <p
                          style={{
                            color:
                              "#64748b",
                            fontSize:
                              "13px",
                          }}
                        >
                          Ordered on{" "}
                          {
                            order.date
                          }
                        </p>
                      </div>

                      <div>
                        <small>
                          ORDER VALUE
                        </small>

                        <h2>
                          {money(
                            order.amount
                          )}
                        </h2>
                      </div>
                    </div>

                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "25px",
                        padding:
                          "20px 0",
                      }}
                    >
                      <div>
                        <strong>
                          👤 Customer
                        </strong>

                        <p>
                          {
                            order.customer
                          }
                        </p>

                        <p>
                          📞{" "}
                          {
                            order.phone
                          }
                        </p>
                      </div>

                      <div>
                        <strong>
                          📦 Product
                        </strong>

                        <p>
                          {
                            order.product
                          }
                        </p>

                        <p>
                          Quantity:{" "}
                          {
                            order.quantity
                          }
                        </p>
                      </div>

                      <div>
                        <strong>
                          💳 Payment
                        </strong>

                        <p>
                          {
                            order.payment
                          }
                        </p>
                      </div>

                      <div>
                        <strong>
                          📍 Address
                        </strong>

                        <p>
                          {
                            order.address
                          }
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop:
                          "1px solid #e5e7eb",
                        paddingTop:
                          "18px",
                      }}
                    >
                      {order.status ===
                        "New Order" && (
                        <div
                          style={
                            buttonRow
                          }
                        >
                          <button
                            onClick={() =>
                              acceptOrder(
                                order.id
                              )
                            }
                            style={
                              greenButton
                            }
                          >
                            ✓ Accept
                            Order
                          </button>

                          <button
                            onClick={() =>
                              rejectOrder(
                                order.id
                              )
                            }
                            style={
                              redButton
                            }
                          >
                            ✕ Reject
                          </button>
                        </div>
                      )}

                      {order.status ===
                        "Processing" && (
                        <button
                          onClick={() =>
                            markReady(
                              order.id
                            )
                          }
                          style={
                            blueButtonStyle
                          }
                        >
                          📦 Mark Ready
                          for Delivery
                        </button>
                      )}

                      {order.status ===
                        "Ready for Delivery" && (
                        <button
                          onClick={() =>
                            markDelivered(
                              order.id
                            )
                          }
                          style={
                            greenButton
                          }
                        >
                          🚚 Mark
                          Delivered
                        </button>
                      )}

                      {order.status ===
                        "Delivered" && (
                        <div
                          style={
                            successBox
                          }
                        >
                          ✓ Order
                          completed
                          successfully.
                        </div>
                      )}

                      {order.status ===
                        "Rejected" && (
                        <div
                          style={
                            dangerBox
                          }
                        >
                          ✕ Order
                          rejected.
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* =================================================
            EARNINGS
        ================================================= */}

        {activePage ===
          "earnings" && (
          <div style={cardStyle}>
            <h2>
              💰 Earnings &
              Settlement
            </h2>

            <p
              style={{
                color: "#64748b",
              }}
            >
              Settlement summary from
              delivered orders.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "25px",
              }}
            >
              <StatCard
                title="Delivered Sales"
                value={money(
                  deliveredSales
                )}
                icon="💰"
              />

              <StatCard
                title="BIJLIKART Commission"
                value={money(
                  platformCommission
                )}
                icon="⚡"
              />

              <StatCard
                title="Seller Settlement"
                value={money(
                  sellerSettlement
                )}
                icon="🏦"
              />
            </div>

            <div
              style={{
                background:
                  "#eff6ff",
                padding: "18px",
                borderRadius:
                  "10px",
                marginTop:
                  "25px",
              }}
            >
              <strong>
                Settlement Bank
              </strong>

              <p>
                {
                  shopProfile.bankName
                }{" "}
                •{" "}
                {
                  shopProfile.accountNumber
                }
              </p>

              <p
                style={{
                  marginBottom: 0,
                }}
              >
                IFSC:{" "}
                {
                  shopProfile.ifsc
                }
              </p>
            </div>

            <p
              style={{
                color: "#777",
                marginTop:
                  "20px",
              }}
            >
              Demo commission is
              currently 10%. Later
              commission can be
              configured by category
              or product.
            </p>
          </div>
        )}

        {/* =================================================
            PROFESSIONAL SHOP PROFILE
        ================================================= */}

        {activePage ===
          "profile" && (
          <div>
            {/* PROFILE HEADER */}

            <div
              style={{
                ...cardStyle,
                marginBottom:
                  "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  gap: "20px",
                  flexWrap:
                    "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    alignItems:
                      "center",
                  }}
                >
                  <div
                    style={
                      shopLogoStyle
                    }
                  >
                    🏪
                  </div>

                  <div>
                    <h2
                      style={{
                        margin:
                          "0 0 5px",
                      }}
                    >
                      {
                        shopProfile.shopName
                      }
                    </h2>

                    <div
                      style={{
                        display:
                          "flex",
                        gap: "8px",
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <span
                        style={
                          approvedBadge
                        }
                      >
                        ✓ Approved
                        Seller
                      </span>

                      <span
                        style={
                          sellerBadge
                        }
                      >
                        Seller ID:
                        BKS-DEMO-001
                      </span>
                    </div>
                  </div>
                </div>

                {!editingProfile && (
                  <button
                    onClick={
                      startProfileEdit
                    }
                    style={
                      blueButtonStyle
                    }
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* PROFILE VIEW */}

            {!editingProfile && (
              <>
                <div
                  style={
                    profileGridStyle
                  }
                >
                  <ProfileSection
                    title="🏪 Business Information"
                  >
                    <ProfileItem
                      label="Shop Name"
                      value={
                        shopProfile.shopName
                      }
                    />

                    <ProfileItem
                      label="Owner Name"
                      value={
                        shopProfile.ownerName
                      }
                    />

                    <ProfileItem
                      label="GSTIN"
                      value={
                        shopProfile.gstin ||
                        "Not provided"
                      }
                    />

                    <ProfileItem
                      label="Marketplace"
                      value="BIJLIKART"
                    />
                  </ProfileSection>

                  <ProfileSection
                    title="📞 Contact Information"
                  >
                    <ProfileItem
                      label="Mobile"
                      value={
                        shopProfile.mobile
                      }
                    />

                    <ProfileItem
                      label="Alternate Mobile"
                      value={
                        shopProfile.alternateMobile ||
                        "Not provided"
                      }
                    />

                    <ProfileItem
                      label="Email"
                      value={
                        shopProfile.email ||
                        "Not provided"
                      }
                    />
                  </ProfileSection>

                  <ProfileSection
                    title="📍 Shop Address"
                  >
                    <ProfileItem
                      label="Address"
                      value={
                        shopProfile.address
                      }
                    />

                    <ProfileItem
                      label="City"
                      value={
                        shopProfile.city
                      }
                    />

                    <ProfileItem
                      label="State"
                      value={
                        shopProfile.state
                      }
                    />

                    <ProfileItem
                      label="Pincode"
                      value={
                        shopProfile.pincode
                      }
                    />
                  </ProfileSection>

                  <ProfileSection
                    title="🏦 Settlement Details"
                  >
                    <ProfileItem
                      label="Account Holder"
                      value={
                        shopProfile.accountHolder ||
                        "Not provided"
                      }
                    />

                    <ProfileItem
                      label="Bank"
                      value={
                        shopProfile.bankName ||
                        "Not provided"
                      }
                    />

                    <ProfileItem
                      label="Account Number"
                      value={
                        shopProfile.accountNumber ||
                        "Not provided"
                      }
                    />

                    <ProfileItem
                      label="IFSC"
                      value={
                        shopProfile.ifsc ||
                        "Not provided"
                      }
                    />

                    <ProfileItem
                      label="UPI ID"
                      value={
                        shopProfile.upiId ||
                        "Not provided"
                      }
                    />
                  </ProfileSection>
                </div>

                <div
                  style={{
                    ...cardStyle,
                    marginTop:
                      "20px",
                  }}
                >
                  <h3>
                    📝 About Shop
                  </h3>

                  <p
                    style={{
                      color:
                        "#475569",
                      lineHeight:
                        "1.7",
                    }}
                  >
                    {
                      shopProfile.description
                    }
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "#f0fdf4",
                    border:
                      "1px solid #bbf7d0",
                    padding:
                      "18px",
                    borderRadius:
                      "12px",
                    marginTop:
                      "20px",
                  }}
                >
                  <strong
                    style={{
                      color:
                        "#15803d",
                    }}
                  >
                    ✓ Seller Account
                    Approved
                  </strong>

                  <p
                    style={{
                      color:
                        "#166534",
                      marginBottom: 0,
                    }}
                  >
                    This shop is
                    approved to list
                    products and receive
                    orders on BIJLIKART.
                  </p>
                </div>
              </>
            )}

            {/* PROFILE EDIT FORM */}

            {editingProfile && (
              <form
                onSubmit={
                  saveShopProfile
                }
                style={cardStyle}
              >
                <h2
                  style={{
                    marginTop: 0,
                  }}
                >
                  ✏️ Edit Shop Profile
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",
                  }}
                >
                  Update your business,
                  contact and settlement
                  information.
                </p>

                <SectionTitle>
                  🏪 Business
                  Information
                </SectionTitle>

                <div
                  style={
                    formGridStyle
                  }
                >
                  <FormField
                    label="Shop Name *"
                    name="shopName"
                    value={
                      profileForm.shopName
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="Owner Name *"
                    name="ownerName"
                    value={
                      profileForm.ownerName
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="GSTIN"
                    name="gstin"
                    value={
                      profileForm.gstin
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Enter GSTIN"
                  />

                  <div>
                    <label
                      style={
                        labelStyle
                      }
                    >
                      Seller ID
                    </label>

                    <input
                      value="BKS-DEMO-001"
                      disabled
                      style={
                        disabledInput
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={
                        labelStyle
                      }
                    >
                      Seller Status
                    </label>

                    <input
                      value="Approved"
                      disabled
                      style={
                        disabledInput
                      }
                    />
                  </div>
                </div>

                <SectionTitle>
                  📞 Contact
                  Information
                </SectionTitle>

                <div
                  style={
                    formGridStyle
                  }
                >
                  <FormField
                    label="Mobile Number *"
                    name="mobile"
                    type="tel"
                    value={
                      profileForm.mobile
                    }
                    onChange={
                      handleProfileChange
                    }
                    maxLength="10"
                  />

                  <FormField
                    label="Alternate Mobile"
                    name="alternateMobile"
                    type="tel"
                    value={
                      profileForm.alternateMobile
                    }
                    onChange={
                      handleProfileChange
                    }
                    maxLength="10"
                  />

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={
                      profileForm.email
                    }
                    onChange={
                      handleProfileChange
                    }
                  />
                </div>

                <SectionTitle>
                  📍 Shop Address
                </SectionTitle>

                <label
                  style={labelStyle}
                >
                  Full Address *
                </label>

                <textarea
                  name="address"
                  value={
                    profileForm.address
                  }
                  onChange={
                    handleProfileChange
                  }
                  rows="3"
                  style={{
                    ...inputStyle,
                    resize:
                      "vertical",
                  }}
                />

                <div
                  style={
                    formGridStyle
                  }
                >
                  <FormField
                    label="City *"
                    name="city"
                    value={
                      profileForm.city
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="State *"
                    name="state"
                    value={
                      profileForm.state
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="Pincode *"
                    name="pincode"
                    value={
                      profileForm.pincode
                    }
                    onChange={
                      handleProfileChange
                    }
                    maxLength="6"
                  />
                </div>

                <SectionTitle>
                  📝 About Shop
                </SectionTitle>

                <textarea
                  name="description"
                  value={
                    profileForm.description
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Tell customers about your shop..."
                  rows="5"
                  style={{
                    ...inputStyle,
                    resize:
                      "vertical",
                  }}
                />

                <SectionTitle>
                  🏦 Bank &
                  Settlement Details
                </SectionTitle>

                <div
                  style={
                    formGridStyle
                  }
                >
                  <FormField
                    label="Account Holder Name"
                    name="accountHolder"
                    value={
                      profileForm.accountHolder
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="Bank Name"
                    name="bankName"
                    value={
                      profileForm.bankName
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="Account Number"
                    name="accountNumber"
                    value={
                      profileForm.accountNumber
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="IFSC Code"
                    name="ifsc"
                    value={
                      profileForm.ifsc
                    }
                    onChange={
                      handleProfileChange
                    }
                  />

                  <FormField
                    label="UPI ID"
                    name="upiId"
                    value={
                      profileForm.upiId
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="shop@upi"
                  />
                </div>

                <div
                  style={{
                    background:
                      "#fff7ed",
                    border:
                      "1px solid #fed7aa",
                    padding:
                      "15px",
                    borderRadius:
                      "10px",
                    margin:
                      "20px 0",
                    color:
                      "#9a3412",
                    fontSize:
                      "13px",
                  }}
                >
                  🔒 In the live
                  BIJLIKART system,
                  sensitive bank details
                  will be stored securely
                  on the backend and will
                  not be exposed directly
                  in the frontend.
                </div>

                <div
                  style={
                    buttonRow
                  }
                >
                  <button
                    type="submit"
                    style={
                      greenButton
                    }
                  >
                    💾 Save Profile
                  </button>

                  <button
                    type="button"
                    onClick={
                      cancelProfileEdit
                    }
                    style={
                      grayButtonStyle
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
);
{showPhotoOptions && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
        width: "320px",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        Select Photo Source
      </h3>

      <button
        style={{
          ...blueButtonStyle,
          width: "100%",
          marginBottom: "10px",
        }}
        onClick={() => {
          setShowPhotoOptions(false);
          cameraInputRef.current?.click();
        }}
      >
        📸 Camera
      </button>

      <button
        style={{
          ...greenButton,
          width: "100%",
          marginBottom: "10px",
        }}
        onClick={() => {
          setShowPhotoOptions(false);
          galleryInputRef.current?.click();
        }}
      >
        🖼 Gallery
      </button>

      <button
        style={{
          ...redButton,
          width: "100%",
        }}
        onClick={() => setShowPhotoOptions(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}  
}

/* =====================================================
   COMPONENTS
===================================================== */

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div style={statCardStyle}>
      <div
        style={{
          fontSize: "28px",
        }}
      >
        {icon}
      </div>

      <p
        style={{
          color: "#777",
        }}
      >
        {title}
      </p>

      <h2>{value}</h2>
    </div>
  );
}

function MiniStat({
  title,
  value,
}) {
  return (
    <div style={statCardStyle}>
      <span
        style={{
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        {title}
      </span>

      <h2
        style={{
          marginBottom: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  maxLength,
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        min={
          type === "number"
            ? "0"
            : undefined
        }
        style={inputStyle}
      />
    </div>
  );
}

function ProfileSection({
  title,
  children,
}) {
  return (
    <div style={cardStyle}>
      <h3
        style={{
          marginTop: 0,
          color: "#0f2f5f",
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

function ProfileItem({
  label,
  value,
}) {
  return (
    <div
      style={{
        padding:
          "12px 0",
        borderBottom:
          "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#94a3b8",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>

      <strong
        style={{
          color: "#334155",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function SectionTitle({
  children,
}) {
  return (
    <h3
      style={{
        marginTop: "30px",
        marginBottom: "5px",
        paddingBottom: "10px",
        borderBottom:
          "1px solid #e5e7eb",
        color: "#0f2f5f",
      }}
    >
      {children}
    </h3>
  );
}

function SimpleOrderTable({
  orders,
  money,
}) {
  return (
    <div
      style={{
        overflowX: "auto",
      }}
    >
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>
              Order ID
            </th>

            <th style={cellStyle}>
              Customer
            </th>

            <th style={cellStyle}>
              Product
            </th>

            <th style={cellStyle}>
              Amount
            </th>

            <th style={cellStyle}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map(
            (order) => (
              <tr key={order.id}>
                <td style={cellStyle}>
                  {order.id}
                </td>

                <td style={cellStyle}>
                  {order.customer}
                </td>

                <td style={cellStyle}>
                  {order.product}
                </td>

                <td style={cellStyle}>
                  {money(
                    order.amount
                  )}
                </td>

                <td style={cellStyle}>
                  <OrderStatus
                    status={
                      order.status
                    }
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function OrderStatus({
  status,
}) {
  let background =
    "#eff6ff";

  let color = "#2563eb";

  let icon = "🔵";

  if (status === "New Order") {
    background = "#ecfdf5";
    color = "#15803d";
    icon = "🟢";
  }

  if (status === "Processing") {
    background = "#fffbeb";
    color = "#b45309";
    icon = "🟡";
  }

  if (
    status ===
    "Ready for Delivery"
  ) {
    background = "#eff6ff";
    color = "#1d4ed8";
    icon = "🚚";
  }

  if (status === "Delivered") {
    background = "#f0fdf4";
    color = "#15803d";
    icon = "✓";
  }

  if (status === "Rejected") {
    background = "#fef2f2";
    color = "#b91c1c";
    icon = "✕";
  }

  return (
    <span
      style={{
        display:
          "inline-block",
        background,
        color,
        padding: "6px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
      }}
    >
      {icon} {status}
    </span>
  );
}

/* =====================================================
   STYLES
===================================================== */

const photoUploadCardStyle = {
  marginBottom: "26px",
  padding: "22px",
  borderRadius: "18px",
  border: "1px solid #dbeafe",
  background:
    "linear-gradient(145deg, #f8fbff 0%, #ffffff 55%, #f5f3ff 100%)",
  boxShadow: "0 10px 28px rgba(37, 99, 235, 0.07)",
};

const photoUploadHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  marginBottom: "16px",
  flexWrap: "wrap",
};

const photoUploadTitleStyle = {
  display: "block",
  fontSize: "18px",
  fontWeight: "800",
  color: "#0f172a",
  marginBottom: "5px",
};

const photoUploadTextStyle = {
  margin: 0,
  maxWidth: "680px",
  color: "#64748b",
  fontSize: "13px",
  lineHeight: 1.6,
};

const photoCountStyle = {
  flex: "0 0 auto",
  padding: "7px 11px",
  borderRadius: "999px",
  background: "#0f2f5f",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "800",
};

const photoPickerStyle = {
  minHeight: "145px",
  border: "2px dashed #93c5fd",
  borderRadius: "16px",
  background: "rgba(239,246,255,.72)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  padding: "18px",
  color: "#1e3a8a",
  cursor: "pointer",
  textAlign: "center",
};

const photoPickerIconStyle = {
  fontSize: "32px",
};

const photoPreviewGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "14px",
  marginTop: "18px",
};

const photoPreviewCardStyle = {
  padding: "9px",
  borderRadius: "14px",
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  boxShadow: "0 5px 16px rgba(15,23,42,.06)",
};

const photoImageBoxStyle = {
  position: "relative",
  height: "130px",
  borderRadius: "10px",
  background: "#f8fafc",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
};

const photoPreviewImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const mainPhotoBadgeStyle = {
  position: "absolute",
  top: "7px",
  left: "7px",
  padding: "5px 8px",
  borderRadius: "999px",
  background: "#16a34a",
  color: "#ffffff",
  fontSize: "10px",
  fontWeight: "900",
};

const photoNumberBadgeStyle = {
  position: "absolute",
  top: "7px",
  right: "7px",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "rgba(15,23,42,.82)",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: "bold",
};

const photoActionRowStyle = {
  display: "flex",
  gap: "7px",
  marginTop: "9px",
  flexWrap: "wrap",
};

const makeMainButtonStyle = {
  flex: 1,
  minWidth: "80px",
  padding: "7px 8px",
  border: "1px solid #bfdbfe",
  borderRadius: "8px",
  background: "#eff6ff",
  color: "#1d4ed8",
  fontSize: "11px",
  fontWeight: "bold",
  cursor: "pointer",
};

const removePhotoButtonStyle = {
  flex: 1,
  minWidth: "70px",
  padding: "7px 8px",
  border: "1px solid #fecaca",
  borderRadius: "8px",
  background: "#fff1f2",
  color: "#dc2626",
  fontSize: "11px",
  fontWeight: "bold",
  cursor: "pointer",
};

const aiListingBoxStyle = {
  marginTop: "18px",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #ddd6fe",
  background: "linear-gradient(135deg, #faf5ff, #eff6ff)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  width: "100%",
};

const aiListingTitleStyle = {
  color: "#5b21b6",
};

const aiListingTextStyle = {
  margin: "5px 0 0",
  maxWidth: "600px",
  color: "#64748b",
  fontSize: "12px",
  lineHeight: 1.5,
};

const aiButtonStyle = {
  border: "none",
  borderRadius: "10px",
  padding: "11px 15px",
  background:
    "linear-gradient(135deg, #6d28d9, #2563eb)",
  color: "#ffffff",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 7px 18px rgba(79,70,229,.22)",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow:
    "0 3px 12px rgba(0,0,0,0.06)",
};

const statCardStyle = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  boxShadow:
    "0 3px 12px rgba(0,0,0,0.06)",
};

const orderCardStyle = {
  background: "white",
  padding: "18px",
  borderRadius: "14px",
  boxShadow:
    "0 3px 12px rgba(0,0,0,0.06)",
};

const profileGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "0 20px",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "7px",
  marginBottom: "15px",
  border:
    "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "15px",
  background: "white",
};

const disabledInput = {
  ...inputStyle,
  background: "#f1f5f9",
  color: "#64748b",
  cursor: "not-allowed",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginTop: "15px",
  color: "#334155",
};

const tableStyle = {
  width: "100%",
  borderCollapse:
    "collapse",
  marginTop: "20px",
};

const cellStyle = {
  padding: "14px",
  borderBottom:
    "1px solid #e5e7eb",
  textAlign: "left",
  verticalAlign:
    "middle",
};

const blueButtonStyle = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const grayButtonStyle = {
  padding: "12px 20px",
  background: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const greenButton = {
  padding: "11px 18px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const redButton = {
  padding: "11px 18px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const smallButton = {
  color: "white",
  border: "none",
  padding: "8px 11px",
  borderRadius: "6px",
  fontWeight: "bold",
};

const smallBlueButton = {
  ...smallButton,
  background: "#2563eb",
  cursor: "pointer",
};

const smallRedButton = {
  ...smallButton,
  background: "#dc2626",
  cursor: "pointer",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const successBox = {
  background: "#f0fdf4",
  color: "#15803d",
  padding: "12px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const dangerBox = {
  background: "#fef2f2",
  color: "#b91c1c",
  padding: "12px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const imagePlaceholder = {
  width: "65px",
  height: "55px",
  background: "#f1f5f9",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "25px",
};

const shopLogoStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "15px",
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "35px",
};

const approvedBadge = {
  background: "#dcfce7",
  color: "#15803d",
  padding: "5px 9px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
};

const sellerBadge = {
  background: "#eff6ff",
  color: "#2563eb",
  padding: "5px 9px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
};

export default SellerDashboard;