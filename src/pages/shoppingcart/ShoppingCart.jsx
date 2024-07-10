import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import "./shoppingcart.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUserIdFromToken } from "../productdetail/getUserIdFromToken";

const ShoppingCart = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
    phone: "",
    city: "",
    country: "",
    street: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("ramburs");
  const [deliveryMethod, setDeliveryMethod] = useState("personal_lift");
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:8060/public/cart/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("merge");
        if (!response.ok) {
          throw new Error("Failed1");
        }
        const data = await response.json();
        if (data && Array.isArray(data.items)) {
          setCart(data.items);
        } else {
          console.error("Data fetched is not an array:", data);
          setCart([]);
        }
      } catch (error) {
        console.error("Failed to fetch cart", error.message);
        setCart([]);
      }
    };
    fetchCart();
  }, [userId, setCart]);

  const fetchTotalPrice = async () => {
    try {
      const response = await fetch(
        `http://localhost:8060/public/totalPrice/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the total price");
      }
      const total = await response.json();
      setTotalPrice(total);
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      fetchTotalPrice();
    }
  }, [userId, navigate]);

  const removeProductFromCart = async (userId, productId) => {
    if (!userId || !productId) {
      console.error("User ID or Product ID is not available.");
      return;
    }

    const url = `http://localhost:8060/public/removeProductToCart/${userId}/${productId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to remove product from cart"
          );
        } else {
          const textError = await response.text();
          throw new Error(textError || "Failed to remove product from cart");
        }
      }

      const data = await response.json();
      setCart(data.items);
      console.log("Product removed:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearCart = () => {
    setCart([]);
    setCustomerInfo([]);
  };

  const incrementProductInCart = async (userId, productId) => {
    if (!userId || !productId) {
      console.error("User ID or Product ID is not available.");
      return;
    }

    try {
      // Asigură-te că URL-ul este corect construit cu userId și productId
      const url = `http://localhost:8060/public/increment/${userId}/${productId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data && Array.isArray(data.items)) {
        setCart(data.items);
      } else {
        console.error("Data fetched is not an array:", data);
        setCart([]); // Asigură-te că starea cart este resetată la un array gol dacă datele primite nu sunt conforme
      }

      if (!response.ok) {
        throw new Error(
          `Failed to increment product in cart: ${response.statusText}`
        );
      }
      fetchTotalPrice();
      console.log("Product quantity incremented successfully");
    } catch (error) {
      console.error("Error incrementing product in cart:", error.message);
    }
  };

  const decrementProductInCart = async (userId, productId) => {
    if (!userId || !productId) {
      console.error("User ID or Product ID is not available.");
      return;
    }

    const url = `http://localhost:8060/public/decrement/${userId}/${productId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to decrement product in cart"
          );
        } else {
          const textError = await response.text();
          throw new Error(textError || "Failed to decrement product in cart");
        }
      }
      fetchTotalPrice();

      const data = await response.json();
      setCart(data.items);
      console.log("Product quantity decremented successfully");
    } catch (error) {
      console.error("Error decrementing product in cart:", error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerInfo.email || !customerInfo.name) {
      // Add any necessary validation
      alert("Please fill all required fields.");
      return;
    }

    // Construct the delivery details and items payload according to your backend requirements
    const orderDetails = {
      delivery: {
        ...customerInfo,
        deliveryMethod: deliveryMethod,
      },
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.productPrice * item.quantity,
      })),
    };

    try {
      const response = await fetch(
        `http://localhost:8060/user/placeorder/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.message}`);
        return;
      }

      console.log("Order placed successfully");
      clearCart();
      navigate("/home");
    } catch (error) {
      console.error("Error placing order:", error);
      console.log("Sending order details:", JSON.stringify(orderDetails));
      alert("Error placing order, try again later.");
    }
  };

  console.log(cart);
  return (
    <div className="shoppingcart">
      <div className="container_shoppingcart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <Card key={item.id} className="cart_item">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={
                      item.image && item.image.startsWith("data:image")
                        ? item.image
                        : `http://localhost:8060${
                            item.productImage
                          }?v=${new Date().getTime()}`
                    }
                    alt={item.name}
                    className="cart_item_image"
                    onError={(e) => {
                      console.log("Image failed to load for item:", item);
                    }}
                  />
                </Link>
                <div className="details">
                  <h1>{(item.productPrice * item.quantity).toFixed(2)} $</h1>

                  <div className="quantity_container">
                    <button
                      className="minusBtn"
                      onClick={() =>
                        decrementProductInCart(userId, item.productId)
                      }
                    >
                      -
                    </button>

                    <p>{item.quantity}</p>
                    <button
                      className="plusBtn"
                      onClick={() =>
                        incrementProductInCart(userId, item.productId)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="removeBtn">
                    <button
                      className="btn lg"
                      onClick={() =>
                        removeProductFromCart(userId, item.productId)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            <div className="totalPrice">
              <h3>Total: {totalPrice} $</h3>
            </div>
          </div>
        )}
      </div>
      <div className="delivery_details">
        <h2>Order Details</h2>
        <form onSubmit={handleSubmitOrder}>
          <label className="email_label">
            Email:
            <input
              className="email_input"
              type="email"
              name="email"
              value={customerInfo.email || ""}
              onChange={handleInputChange}
            />
          </label>
          <label className="name_label">
            Name:
            <input
              className="name_input"
              type="text"
              name="name"
              value={customerInfo.name || ""}
              onChange={handleInputChange}
            />
          </label>
          <label className="phone_label">
            Phone:
            <input
              className="phone_input"
              type="phone"
              name="phone"
              value={customerInfo.phone || ""}
              onChange={handleInputChange}
            />
          </label>
          <label className="city_label">
            City:
            <input
              className="city_input"
              type="text"
              name="city"
              value={customerInfo.city || ""}
              onChange={handleInputChange}
            />
          </label>
          <label className="county_label">
            County:
            <input
              className="county_input"
              type="text"
              name="country"
              value={customerInfo.country || ""}
              onChange={handleInputChange}
            />
          </label>
          <label className="street_label">
            Street:
            <input
              className="street_input"
              type="text"
              name="street"
              value={customerInfo.street || ""}
              onChange={handleInputChange}
            />
          </label>
          <div className="payment-method-selector">
            <p>Payment method:</p>
            <div className="payment-option">Ramburs</div>
          </div>
          <div className="delivery_method_selector">
            <p>Delivery method:</p>
            <div
              className={`delivery_option ${
                deliveryMethod === "personal lift" ? "active" : ""
              }`}
              onClick={() => handleDeliveryMethodChange("PERSONAL_LIFT")}
            >
              Personal lift
            </div>
            <div
              className={`delivery_option ${
                deliveryMethod === "courier" ? "active" : ""
              }`}
              onClick={() => handleDeliveryMethodChange("COURIER")}
            >
              Courier
            </div>
          </div>

          <button
            className={`placeOrder ${
              !customerInfo.email ||
              !customerInfo.name ||
              !customerInfo.phone ||
              !customerInfo.city ||
              !customerInfo.country ||
              !customerInfo.street ||
              !paymentMethod ||
              !deliveryMethod
                ? "disabled"
                : ""
            }`}
            type="submit"
            disabled={
              !customerInfo.email ||
              !customerInfo.name ||
              !customerInfo.phone ||
              !customerInfo.city ||
              !customerInfo.country ||
              !customerInfo.street ||
              !paymentMethod ||
              !deliveryMethod
            }
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCart;
