import React, { useState, useEffect } from "react";
import SectionHead from "../../components/SectionHead";
import { useParams } from "react-router-dom";
import "./updateProductAdmin.css";

function ProductForm() {
  const { productId } = useParams(); // Extrage ID-ul produsului din URL
  const [feedbackDesc, setFeedbackDesc] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackImg, setFeedbackImg] = useState("");
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
        `http://localhost:8060/public/product/${productId}`
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
            image: data.image,
            imageUrl: `http://localhost:8060${data.image}`,
          });
        })
        .catch((error) => {
          console.error("Failed to load product:", error);
          alert("Failed to load product data");
        });
    }
  }, [productId]); // 'productId' ca dependință pentru a reîncărca datele la schimbarea ID-ului

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    // Actualizăm feedback-ul pentru fiecare câmp
    if (name === "description") {
      const maxLength = 250;
      const currentLength = value.length;
      setFeedbackDesc(`${maxLength - currentLength} characters left`);
    } else if (name === "name") {
      const maxLength = 20;
      const currentLength = value.length;
      setFeedbackName(`${maxLength - currentLength} characters left`);
    }
  };

  // Manipulează schimbările fișierului de imagine
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          if (img.width === 452 && img.height === 552) {
            setProduct((prev) => ({ ...prev, image: file }));
            setFeedbackImg(""); // Resetează mesajul de eroare dacă dimensiunile sunt corecte
          } else {
            setProduct((prev) => ({ ...prev, image: null })); // Asigură-te că resetezi imaginea
            setFeedbackImg("Image must be 452x552 pixels.");
          }
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setProduct((prev) => ({ ...prev, image: null })); // Resetează imaginea dacă niciun fișier nu este selectat
      setFeedbackImg(""); // Resetează mesajul de eroare
    }
  };

  // Manipulează trimiterea formularului
  // Manipulează trimiterea formularului
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image || feedbackImg == "Image must be 452x552 pixels.") {
      alert("Please fix the errors before submitting.");
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
              maxLength="20"
              className="nameInput"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <div className="feedbackName">{feedbackName}</div> {}
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
              maxLength="250"
              className="descInput"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </label>
          <div className="feedbackDesc">{feedbackDesc}</div> {}
          <label>
            Image:
            <input
              className="imgInput"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </label>
          <div className="feedbackImg">{feedbackImg}</div> {}
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
