import "../pages/contact/contact.css";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aici poți adăuga logica pentru trimiterea formularului (ex. API call sau altă acțiune)
    console.log("Form data:", formData);
  };
  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <label className="nameC_label">
        Name:
        <input
          className="contact_input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="emailC_label">
        Email:
        <input
          className="contact_input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="subject_label">
        Subject:
        <input
          className="contact_input"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="mess_label">
        Message:
        <textarea
          className="contact_textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </label>
      <br />
      <button className="contact_button" type="submit">
        SEND
      </button>
    </form>
  );
};

export default ContactForm;
