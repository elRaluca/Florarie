import React, { useState, useEffect } from "react";
import "./addProductAdmin.css";
import SectionHead from "../../components/SectionHead";

const AddProductAdmin = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackNameAdd, setFeedbackNameAdd] = useState("");
  const [feedbackDescAdd, setFeedbackDescAdd] = useState("");
  const [feedbackImgAdd, setFeedbackImgAdd] = useState("");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    // Actualizăm feedback-ul pentru descriere
    if (name === "description") {
      const maxLength = 250;
      const currentLength = value.length;
      if (currentLength <= maxLength) {
        setFeedbackDescAdd(`${maxLength - currentLength} characters left`);
      }
    }
    if (name === "name") {
      const maxLength = 20;
      const currentLength = value.length;
      if (currentLength <= maxLength) {
        setFeedbackNameAdd(`${maxLength - currentLength} characters left`);
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width === 452 && img.height === 552) {
            setProduct((prev) => ({ ...prev, image: file }));
            setFeedbackImgAdd("");
          } else {
            setProduct((prev) => ({ ...prev, image: null }));
            setFeedbackImgAdd("Image must be 452x552 pixels");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setProduct((prev) => ({ ...prev, image: null }));
      setFeedbackImgAdd("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedbackImgAdd !== "") {
      alert("Please correct the errors before submitting.");
      return;
    }
    const formData = new FormData();
    formData.append(
      "product",
      JSON.stringify({
        name: product.name,
        price: product.price,
        description: product.description,
      })
    );
    if (product.image) {
      formData.append("image", product.image);
    }
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:8060/admin/createproduct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        setFeedbackMessage("Product added successfully!");
        // Optionally clear the form here
      } else {
        setFeedbackMessage("Failed to add product!");
      }
    } catch (error) {
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
              maxLength="20"
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </label>
          <div className="feedbackNameAdd">{feedbackNameAdd}</div> {}
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
              maxLength="250"
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleInputChange}
            />
          </label>
          <div className="feedbackDescAdd">{feedbackDescAdd}</div> {}
          <label>
            <input
              className="imageProduct"
              placeholder="Image"
              type="file"
              onChange={handleImageChange}
            />
          </label>
          <div className="feedbackImgAdd">{feedbackImgAdd}</div> {}
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
