import React, { useState, useEffect } from "react";
import "./ordersAdmin.css";
import SectionHead from "../../components/SectionHead";

function OrderItem({ order, onUpdateStatus, onUpdateDeliveryStatus }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [deliveryStatus, setDeliveryStatus] = useState(order.delivery?.status);

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const handleDeliveryStatusChange = (event) => {
    setDeliveryStatus(event.target.value);
  };

  const handleUpdateOrderStatusClick = () => {
    onUpdateStatus(order.id, orderStatus);
  };

  const handleUpdateDeliveryStatusClick = () => {
    onUpdateDeliveryStatus(order.id, deliveryStatus);
  };

  return (
    <div className="orderItem">
      <div className="orderDetail">
        <h2>Order #{order.id}</h2>
        <p>User ID: {order.userId}</p>
        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
        <p>Total: ${order.total.toFixed(2)}</p>
        {order.items &&
          order.items.map((item, index) => (
            <div key={index}>
              {item.productId && (
                <div>
                  <div>
                    <p>Product ID: {item.productId}</p>
                    <img
                      src={
                        item.productImage &&
                        item.productImage.startsWith("data:image")
                          ? item.productImage
                          : new URL(
                              item.productImage,
                              "http://localhost:8060/"
                            ).toString() + `?v=${new Date().getTime()}`
                      }
                      alt="Product"
                      style={{ width: "100px", height: "100px" }}
                      onError={(e) => {
                        console.error(
                          `Failed to load product image: ${item.productImage}`
                        );
                        console.log(
                          `Attempted URL: ${
                            new URL(
                              item.productImage, // Remove "/images/" from here
                              "http://localhost:8060/"
                            ).toString() + `?v=${new Date().getTime()}`
                          }`
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        {order.items &&
          order.items.map((item, index) => (
            <div key={index}>
              {item.specialBouquetId && (
                <div>
                  <p>Special Bouquet ID: {item.specialBouquetId}</p>
                  <input
                    type="checkbox"
                    id={`img-expand-${item.specialBouquetId}`}
                    className="img-checkbox"
                  />
                  <label
                    htmlFor={`img-expand-${item.specialBouquetId}`}
                    className="img-label"
                  >
                    <img
                      src={
                        item.specialBouquetImage &&
                        item.specialBouquetImage.startsWith("data:image")
                          ? item.specialBouquetImage
                          : new URL(
                              item.specialBouquetImage,
                              "http://localhost:8060/"
                            ).toString() + `?v=${new Date().getTime()}`
                      }
                      alt="Special Bouquet"
                      style={{ width: "100px", height: "100px" }}
                      onError={(e) => {
                        console.error(
                          `Failed to load image: ${item.specialBouquetImage}`
                        );
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          ))}

        <p>Status: {orderStatus}</p>
        <div className="orderStatus">
          <select
            className="optionValue"
            value={orderStatus}
            onChange={handleOrderStatusChange}
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button
            className="updateStatusBt"
            onClick={handleUpdateOrderStatusClick}
          >
            Update Status
          </button>
        </div>
      </div>
      {order.delivery && (
        <div className="deliveryDetail">
          <h3>Delivery Details:</h3>
          <p>Email: {order.delivery.email}</p>
          <p>Name: {order.delivery.name}</p>
          <p>Phone: {order.delivery.phone}</p>
          <p>City: {order.delivery.city}</p>
          <p>Country: {order.delivery.country}</p>
          <p>Street: {order.delivery.street}</p>
          <p>Status: {deliveryStatus}</p>
          <p>Delivery Method: {order.delivery.deliveryMethod}</p>
          <div className="deliveryStatus">
            <select
              className="optionValueDelivery"
              value={deliveryStatus}
              onChange={handleDeliveryStatusChange}
            >
              <option value="IN_TRANSIT">IN TRANSIT</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="DELAYED">DELAYED</option>
            </select>
            <button
              className="updateStatusDelBt"
              onClick={handleUpdateDeliveryStatusClick}
            >
              Update Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchOrders(); // Apelează funcția de fetch la încărcarea inițială
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8060/admin/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      const data = await response.json();
      if (data && Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Data fetched is not an array:", data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8060/admin/${orderId}/status?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status.");
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const updateDeliveryStatus = async (orderId, newDeliveryStatus) => {
    try {
      const url = `http://localhost:8060/admin/${orderId}/deliveryStatus?status=${newDeliveryStatus}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update delivery status.");
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                delivery: { ...order.delivery, status: newDeliveryStatus },
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const handleSearch = () => {
    if (query === "") {
      fetchOrders(); // Încarcă din nou toate comenzile dacă căutarea este goală
    } else {
      fetch(`http://localhost:8060/admin/orders/search?query=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrders(data); // Actualizează comenzile cu rezultatele căutării
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      fetchOrders(); // Încarcă din nou toate comenzile dacă căutarea este goală
    }
  };

  return (
    <section>
      <SectionHead title="ORDERS" subtitle="ORDERS" />
      <div className="searchBar">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by ID, Name, Email, Phone, Status"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="order">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onUpdateStatus={updateOrderStatus}
              onUpdateDeliveryStatus={updateDeliveryStatus}
            />
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default OrdersAdmin;
