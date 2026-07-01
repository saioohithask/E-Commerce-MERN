import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart", {
        productId,
        quantity: 1,
      });

      alert("Added to Cart ✅");

      navigate("/cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add item ❌");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="products">
      {products.map((p) => (
        <div className="card" key={p._id}>
          <img
            src={p.image}
            alt={p.name}
          />

          <h3>{p.name}</h3>

          <p className="price">₹{p.price}</p>

          <p>{p.description}</p>

          <button onClick={() => addToCart(p._id)}>
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;  