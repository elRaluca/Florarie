import React, { useState, useEffect } from "react";
import "./ordersAdmin.css";
import SectionHead from "../../components/SectionHead";

function OrderItem({ order, onUpdateStatus }) {
  const [newStatus, setNewStatus] = useState(order.status);

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateClick = () => {
    onUpdateStatus(order.id, newStatus);
  };

  return (
    <div className="orderItem">
      <div className="orderDetail">
        <h2>Order #{order.id}</h2>
        <p>User ID: {order.userId}</p>
        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
        <p>Total: ${order.total.toFixed(2)}</p>
        <p>Status: {order.status}</p>
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
          <p>Delivery Method: {order.delivery.deliveryMethod}</p>
        </div>
      )}
      <div>
        <select
          className="optionValue"
          value={newStatus}
          onChange={handleStatusChange}
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button className=" updateStatusBt" onClick={handleUpdateClick}>
          Update Status
        </button>
      </div>
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
        `http://localhost:8060/admin/orders/${orderId}/status?status=${newStatus}`,
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
              onUpdateStatus={updateOrderStatus} // Aceasta este partea importantă
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
