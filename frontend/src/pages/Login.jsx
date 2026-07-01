import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      navigate("/"); // ✅ go to home
    } catch (error) {
      if (error.response?.data?.message === "User not found") {
        alert("User not found. Please register first!");
        navigate("/register"); // ✅ redirect to register
      } else {
        alert("Invalid credentials ❌");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleSubmit}>Login</button>

      {/* ✅ Register Link */}
      <p>
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;