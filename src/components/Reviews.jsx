import SectionHead from "./SectionHead";
import { reviews } from "../data.js";
import Card from "../UI/Card";
import "./Reviews.css";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  return (
    <section className="reviews">
      <SectionHead title="REVIEWS" subtitle="REVIEWS" />
      <div className="container_reviews">
        {reviews.map(({ name, review, imageUrl }) => {
          console.log(name, review, imageUrl);
          return (
            <Card className="reviews_details" key={name}>
              <img src={imageUrl} alt={`${name}'s photo`} />
              <h4>{name}</h4>
              <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <small>{review}</small>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Reviews;
/*<img src={imageUrl} alt={`${name}'s photo`} />*/
