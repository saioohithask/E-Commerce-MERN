import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <h2>🛒 E-Shop</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {token && <Link to="/cart">Cart</Link>}

        {token && <Link to="/orders">Orders</Link>}

        {token ? (
          <span onClick={logout}>Logout</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;