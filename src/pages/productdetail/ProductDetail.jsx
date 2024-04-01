import { useParams } from "react-router-dom";
import Logo from "../../images/logo.png";
import "./productdetail.css";
import { useState } from "react";

const ProductDetail = ({ products, cart, setCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));

  const addToCart = () => {
    if (typeof setCart === "function") {
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        console.log(
          `Quantity of ${product.name} increased in cart. Cart content:`,
          cart
        );
      } else {
        setCart((prevCart) => {
          console.log(`${product.name} added to cart. Cart content:`, prevCart);
          return [...prevCart, { ...product, quantity: 1 }];
        });
      }
    } else {
      console.error("setCart is not a function");
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="productdetail">
      <div className="container_productdetail">
        <div className="productdetail_left">
          <div className="productdetail_left_right">
            <img
              className="product_image"
              src={require(`../../images/${product.imageUrl}`)}
              alt={product.name}
            />
            <h4>DESCRIPTION</h4>
            <p>{product.price} $</p>
            <div className="descriere">
              <p>{product.info}</p>
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
          </div>
          <button className="buy_now_btn" onClick={addToCart}>
            Buy now
          </button>
        </div>
        <div className="productdetail_right">
          <h2>Blossom Boutique</h2>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
