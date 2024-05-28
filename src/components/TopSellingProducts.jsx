import "./TopSellingProduct.css";
import Card from "../UI/Card";
import SectionHead from "./SectionHead";
import { firstFourTopSellingProducts } from "../data.js";
import React, { useState, useEffect } from "react";

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8060/public/top-selling?limit=4")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        console.log("merge");
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section className="top_selling">
      <SectionHead title="TOP SELLING" subtitle="TOP SELLING" />
      <div className="container_top_selling">
        {products.map((product) => (
          <Card className="producttopselling" key={product.id}>
            <img
              src={`http://localhost:8060${product.image}`}
              alt={product.name}
            />

            <h4>{product.name}</h4>
            <small>{product.description}</small>
            <p>{product.price} $</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TopSellingProducts;
