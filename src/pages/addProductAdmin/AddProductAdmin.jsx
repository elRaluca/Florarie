import React, { useState } from "react";
import "./addProductAdmin.css";
import SectionHead from "../../components/SectionHead";

const AddProductAdmin = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8060/auth/createproduct", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product added successfully");
        setFeedbackMessage("Product added successfully!");
      } else {
        console.error("Failed to add product with response:", response);
        setFeedbackMessage("Failed to add product!");
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedbackMessage("Error posting product");
    }
  };
  return (
    <section className="addProductAdmin">
      <SectionHead title="ADD PPRODUCT" subtitle="ADD PRODUCT" />
      <div className="container_addPorductAdmin">
        <form onSubmit={handleSubmit}>
          <label className="nameProduct">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </label>
          <label className="priceProduct">
            <input
              placeholder="Price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </label>
          <label className="descriptionProduct">
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <input
              className="imageProduct"
              placeholder="Image"
              type="file"
              onChange={handleImageChange}
            />
          </label>
          <button className="AddProductBt" type="submit">
            Add Product
          </button>
          <div className="feedbackMessage">{feedbackMessage}</div> {}
        </form>
      </div>
    </section>
  );
};
export default AddProductAdmin;
