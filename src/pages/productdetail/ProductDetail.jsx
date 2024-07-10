import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./productdetail.css";
import React from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ cart, setCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = getUserIdFromToken();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available. User might not be logged in.");
      navigate("/login");
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8060/public/product/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    if (!userId) {
      console.error("User ID is not available. User might not be logged in.");
      return;
    }
    if (typeof setCart === "function" && product) {
      const quantity = 1; // Simplifying the addition to always add 1 unit
      try {
        // Construiește URL-ul cu query parameters direct în URL
        const url = new URL(`http://localhost:8060/public/add`);
        url.searchParams.append("userId", userId);
        url.searchParams.append("productId", product.id);
        url.searchParams.append("quantity", quantity);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to add product to cart: ${response.status}`);
        }

        const data = await response.json();
        console.log("Product added to cart successfully", data);
        setCart((prevCart) => [
          ...prevCart,
          { ...product, quantity: quantity },
        ]); // Update the cart state
        setSuccessMessage("Product added to cart successfully"); // Setează mesajul de succes
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error adding product to cart:", error.message);
      }
    } else {
      console.error("setCart is not a function or product is null");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="productdetail">
      <div className="container_productdetail">
        <div className="productdetail_left">
          <div className="productdetail_left_right">
            <img
              src={`http://localhost:8060${
                product.image
              }?v=${new Date().getTime()}`}
              alt="Product"
            />

            <h4>DESCRIPTION</h4>
            <p>{product.price} $</p>
            <div className="descriere">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="productdetail_left_left">
            <h2>{product.name}</h2>
            <h3>IMPORTANT</h3>
            <p>
              The flowers we use are always fresh. Thus, in some cases, they may
              be in the form of buds. These will bloom within a maximum of 24
              hours if the room temperature is between 23 and 25 degrees
              Celsius. The person receiving this product can enjoy its freshness
              even more in this case
            </p>
            <button className="buy_now_btn" onClick={addToCart}>
              Buy now
            </button>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
        </div>
        <div className="productdetail_right">
          <h2>Blossom Boutique</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
