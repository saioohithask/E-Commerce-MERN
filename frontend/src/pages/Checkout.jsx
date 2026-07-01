import API from "../api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const placeOrder = async () => {
    await API.post("/orders");
    alert("Order placed");
    navigate("/orders");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Checkout</h2>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;