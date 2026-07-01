import { useEffect, useState } from "react";
import API from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      await API.put(`/orders/${id}/cancel`);

      alert("Order cancelled ❌");

      fetchOrders();

    } catch (error) {
      console.log(error);
      alert("Failed to cancel order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px"
          }}
        >
          <h4>Order ID: {order._id}</h4>

          <p>Total: ₹{order.totalPrice}</p>

          <p>
            Status:
            <strong> {order.status}</strong>
          </p>

          {order.status !== "Cancelled" && (
            <button
              onClick={() => cancelOrder(order._id)}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;