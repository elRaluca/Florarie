import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import "./shoppingcart.css";
import { Link, useNavigate } from "react-router-dom";

const ShoppingCart = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
    phone: "",
    city: "",
    county: "",
    street: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("ramburs");
  const [deliveryMethod, setDeliveryMethod] = useState("personal_lift");
  const [isCardPaymentSelected, setIsCardPaymentSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Calcularea prețului total la fiecare actualizare a coșului
    const newTotalPrice = cart.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerInfo([]);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(parseInt(newQuantity, 10), 1) }
          : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "card") {
      setIsCardPaymentSelected(true);
    } else {
      setIsCardPaymentSelected(false);
    }
  };
  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (
      customerInfo.email &&
      customerInfo.name &&
      customerInfo.phone &&
      customerInfo.city &&
      customerInfo.county &&
      customerInfo.street &&
      paymentMethod &&
      deliveryMethod
    ) {
      if (!(paymentMethod === "card" && someConditionIsNotMet())) {
        if (isCardPaymentSelected) {
          // Dacă plata cu cardul este selectată, redirecționează către pagina "/aboutus"
          navigate("/aboutus");
        } else {
          console.log("Order placed:", {
            totalPrice,
            customerInfo,
            paymentMethod,
            deliveryMethod,
          });
          clearCart();
        }
      }
    }
  };

  const someConditionIsNotMet = () => {
    // De exemplu, poți verifica dacă informațiile necesare pentru plata cu cardul sunt disponibile
    return !customerInfo.cardNumber || !customerInfo.cardExpiration;
  };

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
                      item.imageUrl.includes("data:image")
                        ? item.imageUrl
                        : require(`../../images/${item.imageUrl}`)
                    }
                    alt={item.name}
                    className="cart_item_image"
                  />
                </Link>
                <div className="details">
                  <h1>{item.price * item.quantity} $</h1>
                  <div className="quantity_container">
                    <button
                      className="minusBtn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="plusBtn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="removeBtn">
                    <button
                      className="btn lg"
                      onClick={() => removeFromCart(item.id)}
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
              name="county"
              value={customerInfo.county || ""}
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
            <div
              className={`payment-option ${
                paymentMethod === "ramburs" ? "active" : ""
              }`}
              onClick={() => handlePaymentMethodChange("ramburs")}
            >
              Ramburs
            </div>
            <div
              className={`payment-option ${
                paymentMethod === "card" ? "active" : ""
              }`}
              onClick={() => handlePaymentMethodChange("card")}
            >
              Card
            </div>
          </div>
          <div className="delivery_method_selector">
            <p>Delivery method:</p>
            <div
              className={`delivery_option ${
                deliveryMethod === "personal lift" ? "active" : ""
              }`}
              onClick={() => handleDeliveryMethodChange("personal lift")}
            >
              Personal lift
            </div>
            <div
              className={`delivery_option ${
                deliveryMethod === "courier" ? "active" : ""
              }`}
              onClick={() => handleDeliveryMethodChange("courier")}
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
              !customerInfo.county ||
              !customerInfo.street ||
              !paymentMethod ||
              !deliveryMethod ||
              (paymentMethod === "card" && someConditionIsNotMet())
                ? "disabled"
                : ""
            }`}
            type="submit"
            disabled={
              !customerInfo.email ||
              !customerInfo.name ||
              !customerInfo.phone ||
              !customerInfo.city ||
              !customerInfo.county ||
              !customerInfo.street ||
              !paymentMethod ||
              !deliveryMethod ||
              (paymentMethod === "card" && someConditionIsNotMet())
            }
          >
            {paymentMethod === "card" ? "Place Order" : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCart;
