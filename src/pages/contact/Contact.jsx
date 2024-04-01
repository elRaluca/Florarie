import "./contact.css";
import Footer from "../../components/Footer";
import SectionHead from "../../components/SectionHead";
import React from "react";
import ContactForm from "../../components/ContactForm";
import { FaTwitter, FaFacebookF } from "react-icons/fa";

const Contact = () => {
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
          <div className="socials">
            <a
              href="https://facebook.com/"
              target="blank"
              rel="noreferrer noopener"
            >
              <FaFacebookF />
            </a>
            <p
              href="https://twitter.com/"
              target="blank"
              rel="noreferrer noopener"
            >
              <FaTwitter />
            </p>
          </div>
          <div className="address">
            <h4>ADDRESS:</h4>
            <p>Bucuresti, Aleea Primaverii 49</p>
          </div>
          <div className="hours">
            <h4>OPENING HOURS:</h4>
            <p>
              <p>Monday 08:00-18:00</p>
              <p>Tuesday 08:00-18:00</p>
              <p>Wednesday 08:00-18:00</p>
              <p>Thursday 08:00-18:00 </p>
              <p>Friday 08:00-16:00 </p>
              <p>Saturday 08:00-16:00</p>
              <p>Sunday 08:00-14:00</p>
            </p>
          </div>
        </div>
        <div className="contact_right">
          <h1>SEND A </h1>
          <h2>MESSAGE</h2>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
