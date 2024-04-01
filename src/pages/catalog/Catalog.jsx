// Catalog.js
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import SectionHead from "../../components/SectionHead";
import Card from "../../UI/Card";
import { products } from "../../data.js";
import "./catalog.css";

const Catalog = () => {
  return (
    <section className="catalog">
      <div className="container_catalog">
        <SectionHead
          title="Catalog"
          subtitle="Catalog"
          className="section_head"
        />

        <div className="catalog_wrapper">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="productLink"
            >
              <Card className="productCard">
                <img
                  src={require(`../../images/${product.imageUrl}`)}
                  alt="poze"
                />
                <h4>{product.name}</h4>
                <p>{product.price} $</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Catalog;
