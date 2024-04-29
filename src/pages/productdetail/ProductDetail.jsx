import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./productdetail.css";

const ProductDetail = ({ cart, setCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8060/auth/product/${productId}`
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

  const addToCart = () => {
    if (typeof setCart === "function" && product) {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      }
    } else {
      console.error("setCart is not a function");
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
