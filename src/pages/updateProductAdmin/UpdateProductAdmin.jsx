import React, { useState, useEffect } from "react";
import SectionHead from "../../components/SectionHead";
import { useParams } from "react-router-dom";
import "./updateProductAdmin.css";

function ProductForm() {
  const { productId } = useParams(); // Extrage ID-ul produsului din URL

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    imageUrl: null,
  });

  // Definirea funcției fetchProduct direct în componentă
  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8060/auth/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json(); // Asigură-te că 'data' este definită înainte de a fi folosită
      console.log(data); // Loghează 'data' pentru a verifica conținutul său
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Propagă eroarea pentru a putea fi prinsă mai departe
    }
  };

  // Funcție pentru încărcarea datelor produsului
  useEffect(() => {
    if (productId) {
      fetchProduct(productId)
        .then((data) => {
          setProduct({
            name: data.name,
            price: data.price,
            description: data.description,
            image: null,
            imageUrl: `http://localhost:8060${data.image}`,
          });
        })
        .catch((error) => {
          console.error("Failed to load product:", error);
          alert("Failed to load product data");
        });
    }
  }, [productId]); // 'productId' ca dependință pentru a reîncărca datele la schimbarea ID-ului

  // Manipulează schimbările în formular
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manipulează schimbările fișierului de imagine
  const handleFileChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Manipulează trimiterea formularului
  // Manipulează trimiterea formularului
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
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(
        `http://localhost:8060/admin/update/${productId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            // Include tokenul JWT în headers pentru autentificare
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
            Name:
            <input
              className="nameInput"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Price:
            <input
              className="priceInput"
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </label>
          <label className="desc">
            Description:
            <textarea
              className="descInput"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Image:
            <input
              className="imgInput"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </label>

          <button className="UpdateProductBt" type="submit">
            Update Product
          </button>
        </form>
        <div className="CurretnImage">
          <p>Current Image:</p>
          {product.imageUrl && (
            <img src={product.imageUrl} alt="Current Product" />
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductForm;
