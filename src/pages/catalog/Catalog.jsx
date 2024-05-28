// Catalog.js

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import SectionHead from "../../components/SectionHead";
import Card from "../../UI/Card";
import { products } from "../../data.js";
import "./catalog.css";
import { useNavigate } from "react-router-dom";

const Catalog = () => {
  const [products, setProducts] = useState([]); // Starea pentru produse
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8060/public/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data); // Setează produsele în stare
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8060/admin/delete/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete the product");
        }
        setProducts(products.filter((product) => product.id !== productId));

        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product");
      }
    }
  };

  const isAdmin = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole === "ROLE_ADMIN";
  };

  const goToEditPage = (productId) => {
    navigate(`/updateProductAdmin/${productId}`);
  };

  return (
    <section className="catalog">
      <div className="container_catalog">
        <SectionHead
          title="Catalog"
          subtitle="Catalog"
          className="section_head"
        />

        <div className="catalog_wrapper">
          {products.map((product) => {
            console.log(
              `URL-ul imaginii este: http://localhost:8060${product.image}`
            );
            return (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="productLink"
              >
                <Card className="productCard">
                  <img
                    src={`http://localhost:8060${
                      product.image
                    }?v=${new Date().getTime()}`}
                    alt="Product"
                  />
                  <h4>{product.name}</h4>
                  <p>{product.price} $</p>
                  {isAdmin() && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Oprirea propagării evenimentului
                        e.preventDefault();
                        handleDeleteProduct(product.id);
                      }}
                      className="deleteBt"
                    >
                      Delete
                    </button>
                  )}
                  {isAdmin() && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        goToEditPage(product.id);
                      }}
                      className="updateBt"
                    >
                      Update
                    </button>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Catalog;
