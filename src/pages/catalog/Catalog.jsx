// Catalog.js

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import SectionHead from "../../components/SectionHead";
import Card from "../../UI/Card";
import { products } from "../../data.js";
import "./catalog.css";

const Catalog = () => {
  const [products, setProducts] = useState([]); // Starea pentru produse

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8060/auth/product");
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
