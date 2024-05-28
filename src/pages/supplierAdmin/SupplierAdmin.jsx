import React, { useState, useEffect } from "react";
import SupplierForum from "./SupplierForum"; // Importă componenta SupplierForm
import "./supplierAdmin.css";
import SectionHead from "../../components/SectionHead";

const SupplierAdmin = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8060/admin/allsupp", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8060/admin/deleteSupplie/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete supplier");
      }
      fetchSuppliers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    fetchSuppliers();
  };

  return (
    <section className="suppplier">
      <SectionHead title="SUPPLIER" subtitle="SUPPLIER" />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="getAllSupp">
        {suppliers.map((supplier) => (
          <div className="getSupplier" key={supplier.id}>
            <button
              className="deletSuppBt"
              onClick={() => handleDelete(supplier.id)}
            >
              Delete
            </button>
            <p className="nameSupp">Name: {supplier.name}</p>
            <p>Contact: {supplier.contact}</p>
            <p>Phone: {supplier.phone}</p>
            <p>Email: {supplier.email}</p>
            <p>Address: {supplier.address}</p>
            <p>City: {supplier.city}</p>
            <p>Country: {supplier.country}</p>
            <p>Zip Code: {supplier.zipCode}</p>
            <p>Additional Info: {supplier.additionalInfo}</p>
            <p className="getFlowerSupp">Flowers:</p>

            {supplier.supplierFlowers.map((flower, index) => (
              <li className="flowerSupp" key={index}>
                {flower.flowerType} - {flower.quantity}
              </li>
            ))}
          </div>
        ))}
      </div>
      <div className="addSupplier">
        <h1>Add a Supplier</h1>
      </div>

      <SupplierForum onFormSubmit={handleFormSubmit} />
    </section>
  );
};

export default SupplierAdmin;
