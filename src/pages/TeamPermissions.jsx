import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function TeamPermissions() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Aman Sharma",
      mobile: "8888888888",
      role: "Operations Staff",
      sellers: true,
      products: false,
      orders: true,
      customers: false,
      active: true,
    },
    {
      id: 2,
      name: "Rohit Verma",
      mobile: "7777777777",
      role: "Product Staff",
      sellers: false,
      products: true,
      orders: false,
      customers: false,
      active: true,
    },
    {
      id: 3,
      name: "Neeraj Singh",
      mobile: "6666666666",
      role: "Support Staff",
      sellers: false,
      products: false,
      orders: true,
      customers: true,
      active: true,
    },
  ]);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("Operations Staff");

  function addEmployee(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter employee name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const mobileExists = staff.some(
      (employee) => employee.mobile === mobile
    );

    if (mobileExists) {
      alert("This mobile number is already registered.");
      return;
    }

    let permissions = {
      sellers: false,
      products: false,
      orders: false,
      customers: false,
    };

    if (role === "Operations Staff") {
      permissions = {
        sellers: true,
        products: false,
        orders: true,
        customers: false,
      };
    }

    if (role === "Product Staff") {
      permissions = {
        sellers: false,
        products: true,
        orders: false,
        customers: false,
      };
    }

    if (role === "Support Staff") {
      permissions = {
        sellers: false,
        products: false,
        orders: true,
        customers: true,
      };
    }

    const newEmployee = {
      id: Date.now(),
      name: name.trim(),
      mobile,
      role,
      ...permissions,
      active: true,
    };

    setStaff((oldStaff) => [...oldStaff, newEmployee]);

    setName("");
    setMobile("");
    setRole("Operations Staff");

    alert("Employee added successfully.");
  }

  function toggleEmployee(id) {
    setStaff((oldStaff) =>
      oldStaff.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              active: !employee.active,
            }
          : employee
      )
    );
  }

  function togglePermission(id, permission) {
    setStaff((oldStaff) =>
      oldStaff.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              [permission]: !employee[permission],
            }
          : employee
      )
    );
  }

  function changeRole(id, newRole) {
    setStaff((oldStaff) =>
      oldStaff.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              role: newRole,
            }
          : employee
      )
    );
  }

  function removeEmployee(id) {
    const confirmed = window.confirm(
      "Remove this employee from BIJLIKART?"
    );

    if (!confirmed) {
      return;
    }

    setStaff((oldStaff) =>
      oldStaff.filter((employee) => employee.id !== id)
    );
  }

  function logoutOwner() {
    const confirmed = window.confirm(
      "Logout from Owner Panel?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("bijlikartAdminAuth");
    localStorage.removeItem("bijlikartAdminRole");

    navigate("/admin-login", {
      replace: true,
    });
  }

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}

      <aside
        className="admin-sidebar"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div className="admin-logo">
          <h2>⚡ BIJLIKART</h2>
          <p>Owner Panel</p>
        </div>

        <div className="admin-menu">
          <button onClick={() => navigate("/admin")}>
            📊 Dashboard
          </button>

          <button onClick={() => navigate("/admin/sellers")}>
            🏪 Sellers
          </button>

          <button onClick={() => navigate("/admin/products")}>
            📦 Products
          </button>

          <button onClick={() => navigate("/admin/orders")}>
            🛒 Orders
          </button>

          <button onClick={() => navigate("/admin/commission")}>
            💰 Commission
          </button>

          <button onClick={() => navigate("/admin/customers")}>
            👥 Customers
          </button>

          <button
            className="active"
            onClick={() => navigate("/admin/team")}
          >
            👨‍💼 Team & Permissions
          </button>

          <button onClick={() => navigate("/admin/settings")}>
            ⚙️ Settings
          </button>
        </div>

        {/* BOTTOM SIDEBAR BUTTONS */}

        <div
          style={{
            marginTop: "auto",
            paddingTop: "30px",
            paddingBottom: "5px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "8px",
              border: "1px solid #5faeff",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            ← Customer Website
          </button>

          <button
            onClick={logoutOwner}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "8px",
              border: "none",
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🚪 Owner Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Team & Permissions</h1>

            <p>
              Control employee accounts and access permissions.
            </p>
          </div>

          <div className="admin-badge">
            👑 Owner Only
          </div>
        </div>

        {/* SECURITY NOTICE */}

        <div
          style={{
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            padding: "18px",
            borderRadius: "12px",
            marginTop: "25px",
          }}
        >
          <strong>
            🔐 Owner Protected Controls
          </strong>

          <p
            style={{
              marginBottom: 0,
              color: "#7c2d12",
            }}
          >
            Commission, settlements, employee permissions
            and sensitive marketplace settings remain
            Owner-only.
          </p>
        </div>

        {/* STATS */}

        <div className="admin-stats">
          <div className="stat-card">
            <span>👨‍💼</span>
            <p>Total Employees</p>
            <h2>{staff.length}</h2>
          </div>

          <div className="stat-card">
            <span>✅</span>
            <p>Active Employees</p>

            <h2>
              {
                staff.filter(
                  (employee) => employee.active
                ).length
              }
            </h2>
          </div>

          <div className="stat-card">
            <span>⛔</span>
            <p>Disabled</p>

            <h2>
              {
                staff.filter(
                  (employee) => !employee.active
                ).length
              }
            </h2>
          </div>

          <div className="stat-card">
            <span>👑</span>
            <p>Owner Accounts</p>
            <h2>1</h2>
          </div>
        </div>

        {/* ADD EMPLOYEE */}

        <section className="admin-section">
          <div className="section-title">
            <div>
              <h2>Add Employee</h2>

              <p>
                Create a new BIJLIKART staff account.
              </p>
            </div>
          </div>

          <form
            onSubmit={addEmployee}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              alignItems: "end",
              marginTop: "20px",
            }}
          >
            <div>
              <label style={labelStyle}>
                Employee Name
              </label>

              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                Mobile Number
              </label>

              <input
                type="tel"
                maxLength="10"
                placeholder="10-digit mobile"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                Role
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                style={inputStyle}
              >
                <option>
                  Operations Staff
                </option>

                <option>
                  Product Staff
                </option>

                <option>
                  Support Staff
                </option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                padding: "13px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                minHeight: "44px",
              }}
            >
              + Add Employee
            </button>
          </form>
        </section>

        {/* EMPLOYEE LIST */}

        <section className="admin-section">
          <div className="section-title">
            <div>
              <h2>Employee Accounts</h2>

              <p>
                Change roles, permissions or disable access.
              </p>
            </div>
          </div>

          <div
            className="table-wrapper"
            style={{
              overflowX: "auto",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Sellers</th>
                  <th>Products</th>
                  <th>Orders</th>
                  <th>Customers</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {staff.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <strong>
                        {employee.name}
                      </strong>
                    </td>

                    <td>
                      {employee.mobile}
                    </td>

                    <td>
                      <select
                        value={employee.role}
                        onChange={(e) =>
                          changeRole(
                            employee.id,
                            e.target.value
                          )
                        }
                        style={{
                          padding: "8px",
                          borderRadius: "6px",
                          border:
                            "1px solid #d1d5db",
                        }}
                      >
                        <option>
                          Operations Staff
                        </option>

                        <option>
                          Product Staff
                        </option>

                        <option>
                          Support Staff
                        </option>
                      </select>
                    </td>

                    <PermissionCell
                      checked={employee.sellers}
                      onChange={() =>
                        togglePermission(
                          employee.id,
                          "sellers"
                        )
                      }
                    />

                    <PermissionCell
                      checked={employee.products}
                      onChange={() =>
                        togglePermission(
                          employee.id,
                          "products"
                        )
                      }
                    />

                    <PermissionCell
                      checked={employee.orders}
                      onChange={() =>
                        togglePermission(
                          employee.id,
                          "orders"
                        )
                      }
                    />

                    <PermissionCell
                      checked={employee.customers}
                      onChange={() =>
                        togglePermission(
                          employee.id,
                          "customers"
                        )
                      }
                    />

                    <td>
                      {employee.active ? (
                        <strong
                          style={{
                            color: "#15803d",
                          }}
                        >
                          ● Active
                        </strong>
                      ) : (
                        <strong
                          style={{
                            color: "#dc2626",
                          }}
                        >
                          ● Disabled
                        </strong>
                      )}
                    </td>

                    <td
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <button
                        onClick={() =>
                          toggleEmployee(employee.id)
                        }
                        style={{
                          padding: "8px 10px",
                          border: "none",
                          borderRadius: "6px",
                          background:
                            employee.active
                              ? "#f59e0b"
                              : "#16a34a",
                          color: "white",
                          cursor: "pointer",
                          marginRight: "6px",
                        }}
                      >
                        {employee.active
                          ? "Disable"
                          : "Enable"}
                      </button>

                      <button
                        onClick={() =>
                          removeEmployee(employee.id)
                        }
                        style={{
                          padding: "8px 10px",
                          border: "none",
                          borderRadius: "6px",
                          background: "#dc2626",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function PermissionCell({
  checked,
  onChange,
}) {
  return (
    <td>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{
          width: "18px",
          height: "18px",
          cursor: "pointer",
        }}
      />
    </td>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
};

export default TeamPermissions;