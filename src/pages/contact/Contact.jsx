import "./contact.css";
import Footer from "../../components/Footer";
import SectionHead from "../../components/SectionHead";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { getUserIdFromToken } from "../productdetail/getUserIdFromToken";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackMessageRev, setFeedbackMessageRev] = useState("");
  const userId = getUserIdFromToken();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
      const maxLength = 30;
      setFeedbackName(`${maxLength - value.length} characters left`);
    } else if (name === "message") {
      setMessage(value);
      const maxLength = 500;
      setFeedbackMessageRev(`${maxLength - value.length} Characters left`);
    }
  };

  function addReview() {
    if (!userId) {
      console.error("User ID is not available. User might not be logged in.");
      navigate("/login");
      return;
    }
    const review = { name, message, rating };

    fetch("http://localhost:8060/user/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Review added:", data);
        setName("");
        setMessage("");
        setRating(1);
        setFeedbackName("");
        setFeedbackMessageRev("");
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <section className="contact">
      <SectionHead title="CONTACT" subtitle="CONTACT" />
      <div className="container_contact">
        <div className="contact_left">
          <div className="phone">
            <h4>PHONE:</h4>
            <p>076-754-0136</p>
          </div>
          <div className="email">
            <h4>EMAIL:</h4>
            <p>blossom_boutique@gmail.com</p>
          </div>
          <div className="facebook">
            <h4>FACEBOOK:</h4>
            <p>Blossom Boutique</p>
          </div>
          <div className="twitter">
            <h4>TWITTER:</h4>
            <p>Blossom Boutique</p>
          </div>

          <div className="address">
            <h4>ADDRESS:</h4>
            <p>Bucuresti, Aleea Primaverii 49</p>
          </div>
          <div className="hours">
            <h4>OPENING HOURS:</h4>
            <p>Monday 08:00-18:00</p>
            <p>Tuesday 08:00-18:00</p>
            <p>Wednesday 08:00-18:00</p>
            <p>Thursday 08:00-18:00</p>
            <p>Friday 08:00-16:00</p>
            <p>Saturday 08:00-16:00</p>
            <p>Sunday 08:00-14:00</p>
          </div>
        </div>
        <div className="contact-right">
          <h1>Review us</h1>
          <div className="nameReview">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              maxLength="30"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
              placeholder="Your Name"
            />
            <div className="feedbackName">{feedbackName}</div>
          </div>
          <div className="messageReview">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              maxLength="500"
              name="message"
              value={message}
              onChange={handleInputChange}
              required
              placeholder="Your Message"
            ></textarea>
            <div className="feedbackMessageRev">{feedbackMessageRev}</div>
          </div>
          <div className="ratingReview">
            <label htmlFor="rating">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
          <button className="ratingBt" onClick={() => addReview()}>
            Send
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
