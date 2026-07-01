import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");

      // Remove invalid products
      const validCart = res.data.filter(
        (item) => item.productId
      );

      setCart(validCart);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchCart();
  }, []);

  const increaseQty = async (id) => {
    try {
      await API.put(`/cart/${id}/increase`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (id) => {
    try {
      await API.put(`/cart/${id}/decrease`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.productId.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const products = cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      await API.post("/orders", {
        products,
        totalPrice,
      });

      alert("Order Placed Successfully ✅");

      setCart([]);

      navigate("/orders");

    } catch (error) {
      console.log(error);
      alert("Failed To Place Order ❌");
    }
  };

  return (
    <div className="cart">
      <h2>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={item.productId.image}
                alt={item.productId.name}
              />

              <div className="cart-details">
                <h3>{item.productId.name}</h3>

                <p>₹{item.productId.price}</p>

                <div className="quantity-box">
                  <button
                    onClick={() => decreaseQty(item._id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="total">
            Total: ₹{totalPrice}
          </h2>

          <button
            className="checkout-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;