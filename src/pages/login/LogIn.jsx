// LogIn.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import Footer from "../../components/Footer";
import "../singup/singup.css";
import "./login.css";
import { Users } from "../../data.js";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [incorrectPasswordError, setIncorrectPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailNotFoundError(false);
    setIncorrectPasswordError(false);

    // Verifică dacă adresa de email există
    const existingEmail = Users.find((user) => user.email === formData.email);
    if (!existingEmail) {
      setEmailNotFoundError(true);
      return;
    }

    // Verifică dacă parola este corectă
    const correctPassword = existingEmail.password; // Aici trebuie să ai o metodă mai sigură pentru verificarea parolei
    if (formData.password !== correctPassword) {
      setIncorrectPasswordError(true);
      return;
    }

    // Aici poți adăuga logica pentru redirecționarea către pagina principală sau altă acțiune după autentificare
    console.log("Successfully logged in!");
  };

  return (
    <section className="singup">
      {" "}
      {/* Păstrează clasa 'singup' pentru a folosi stilurile existente */}
      <div className="container_singup">
        <div className="singup_left">
          <div className="link_left">
            <Link to="/aboutus" className="btn lg">
              About us
            </Link>
            <Link to="/specialbouquete" className="btn lg">
              Special Bouquete
            </Link>
            <Link to="/catalog" className="btn lg">
              Catalog
            </Link>
          </div>
          <img src={Logo} alt="Nav Logo" />
        </div>
        <div className="singup_right_content">
          <div className="singup_right">
            <div className="text_LogIn">
              <h2>Log In</h2>{" "}
            </div>
            <form className="singUp_Form" onSubmit={handleSubmit}>
              <label className="singUp_label">
                {formData.email.length === 0 && <span>Email</span>}
                <input
                  className={`singUp_input ${
                    emailNotFoundError ? "error" : ""
                  }`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {emailNotFoundError && (
                  <p className="error_message">Account not found.</p>
                )}
              </label>
              <br />
              <label className="singUp_label">
                {formData.password.length === 0 && <span>Password</span>}
                <input
                  className={`singUp_input ${
                    incorrectPasswordError ? "error" : ""
                  }`}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ borderColor: incorrectPasswordError ? "red" : "" }}
                />
                {incorrectPasswordError && (
                  <p className="error_message">Incorrect password.</p>
                )}
              </label>

              <br />
              <div className="create">
                {" "}
                {/* Menține clasa 'create' pentru a folosi stilurile existente */}
                <button type="submit">Log In</button>{" "}
                {/* Actualizează textul butonului pentru a reflecta pagina de logare */}
              </div>
            </form>
            <div className="recover_account">
              <p>Have you forgotten the password?</p>
              <Link to="/recoveraccount">
                {" "}
                <button>Recover account.</button>{" "}
              </Link>
            </div>
            <div className="have_acc_singup">
              <p>Don't have an account yet?</p>
              <Link to="/singup">
                {" "}
                {/* Actualizează linkul pentru a redirecționa către pagina de înregistrare */}
                <button>Sign Up.</button>{" "}
                {/* Actualizează textul butonului pentru a reflecta pagina de înregistrare */}
              </Link>
            </div>
            <div className="problems_contactus">
              <p>Still having problems?</p>
              <Link to="/contact">
                {" "}
                <button>Contact us.</button>{" "}
              </Link>
            </div>
            <div className="contactBt">
              <Link to="/contact">
                {" "}
                <button>Contact</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LogIn;
