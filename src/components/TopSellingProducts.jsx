import "./TopSellingProduct.css";
import Card from "../UI/Card";
import SectionHead from "./SectionHead";
import { firstFourTopSellingProducts } from "../data.js";

const TopSellingProducts = () => {
  return (
    <section className="top_selling">
      <SectionHead title="TOP SELLING" subtitle="TOP SELLING" />
      <div className="container_top_selling">
        {firstFourTopSellingProducts.map(
          ({ id, name, info, price, imageUrl }) => (
            <Card className="producttopselling" key={id}>
              <img src={require(`../images/${imageUrl}`)} alt="poze" />
              <h4>{name}</h4>
              <small>{info}</small>
              <p>{price} $</p>
            </Card>
          )
        )}
      </div>
    </section>
  );
};

export default TopSellingProducts;
