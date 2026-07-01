  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import API from "../api";
  import "../styles/auth.css";

  function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
      name: "",
      email: "",
      password: ""
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await API.post("/auth/register", form);

        alert("Registered successfully ✅");

        navigate("/login"); // ✅ go to login
      } catch (error) {
        alert("Registration failed ❌");
      }
    };

    return (
      <div className="auth-container">
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit}>Register</button>

        {/* ✅ Login Link */}
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    );
  }

  export default Register;