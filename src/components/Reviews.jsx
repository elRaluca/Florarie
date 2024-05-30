import React, { useState, useEffect } from "react";
import SectionHead from "./SectionHead";
import Card from "../UI/Card";
import "./Reviews.css";
import { FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import staticImageUrl from "../images/buchetreview.jpg";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0); // Indexul pentru navigație

  useEffect(() => {
    fetch("http://localhost:8060/public/getReviews", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched reviews:", data);
        setReviews(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderStars = (rating) => {
    return Array(rating)
      .fill()
      .map((_, idx) => <FaStar key={idx} />);
  };

  const nextReviews = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 3, reviews.length - 3));
  };

  const prevReviews = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  return (
    <section className="reviews">
      <SectionHead title="REVIEWS" subtitle="Reviews " />
      <div className="container_reviews">
        {reviews
          .slice(index, index + 3)
          .map(({ name, message, rating }, idx) => (
            <Card className="reviews_details" key={idx}>
              <img src={staticImageUrl} alt="Review photo" />
              <h3>{name}</h3>
              <h5>{message}</h5>
              <div className="stars">{renderStars(rating)}</div>
            </Card>
          ))}
      </div>
      <div className="navigation">
        {index > 0 && (
          <button className="ArrowBt" onClick={prevReviews}>
            <FaArrowLeft />
          </button>
        )}
        {index + 3 < reviews.length && (
          <button className="ArrowBt" onClick={nextReviews}>
            <FaArrowRight />
          </button>
        )}
      </div>
    </section>
  );
};

export default Reviews;
