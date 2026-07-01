import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;