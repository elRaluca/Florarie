import React, { useState } from "react";
import "./supplierForum.css";

const SupplierForum = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    additionalInfo: "",
    supplierFlowers: [{ flowerType: "", quantity: 0 }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFlowerChange = (index, e) => {
    const { name, value } = e.target;
    const newSupplierFlowers = [...formData.supplierFlowers];
    newSupplierFlowers[index][name] = value;
    setFormData({ ...formData, supplierFlowers: newSupplierFlowers });
  };

  const handleAddFlower = () => {
    setFormData({
      ...formData,
      supplierFlowers: [
        ...formData.supplierFlowers,
        { flowerType: "", quantity: 0 },
      ],
    });
  };

  const handleRemoveFlower = (index) => {
    const newSupplierFlowers = formData.supplierFlowers.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, supplierFlowers: newSupplierFlowers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8060/admin/createSupplie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save supplier");
      }

      onFormSubmit();
      setFormData({
        name: "",
        contact: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
        additionalInfo: "",
        supplierFlowers: [{ flowerType: "", quantity: 0 }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addSupp">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          required
        />
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Additional Info"
        />
        <h3>Flowers</h3>
        {formData.supplierFlowers.map((flower, index) => (
          <div className="flower-group" key={index}>
            <input
              type="text"
              name="flowerType"
              value={flower.flowerType}
              onChange={(e) => handleFlowerChange(index, e)}
              placeholder="Flower Type"
              required
            />
            <input
              type="number"
              name="quantity"
              value={flower.quantity}
              onChange={(e) => handleFlowerChange(index, e)}
              placeholder="Quantity"
              required
            />
            <button type="button" onClick={() => handleRemoveFlower(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddFlower}>
          Add Flower
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SupplierForum;
