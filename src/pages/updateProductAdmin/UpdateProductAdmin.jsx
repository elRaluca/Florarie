import React, { useState, useEffect } from "react";
import SectionHead from "../../components/SectionHead";
import "./updateProductAdmin.css";

function ProductForm({ productId, fetchProduct }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (productId) {
      fetchProduct(productId).then((data) => {
        setProduct({
          name: data.name,
          price: data.price,
          description: data.description,
          image: null,
        });
      });
    }
  }, [productId, fetchProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    try {
      const response = await fetch(`/admin/update/${productId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const updatedProduct = await response.json();
      alert("Product updated successfully");
      console.log(updatedProduct);
    } catch (error) {
      console.error("Failed to update the product:", error);
    }
  };

  return (
    <section className="updateProduct">
      <SectionHead title="UP PPRODUCT" subtitle="UP PRODUCT" />
      <div className="container_updatePorductAdmin">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              placeholder="Price"
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </label>
          <label>
            <textarea
              placeholder="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </label>
          <label>
            <input type="file" name="image" onChange={handleFileChange} />
          </label>
          <button className="UpdateProductBt" type="submit">
            Update Product
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
