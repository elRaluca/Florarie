// LogIn.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import Footer from "../../components/Footer";
import "../singup/singup.css";
import "./login.css";
import { Users } from "../../data.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [incorrectPasswordError, setIncorrectPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailNotFoundError(false);
    setIncorrectPasswordError(false);

    try {
      console.log("Submitting form", formData);
      const response = await axios.post(
        "http://localhost:8060/public/singin",
        formData
      );

      console.log("Response data:", response.data);

      const { token, email, role } = response.data;
      // Stochează tokenul de autentificare în mod securizat, de exemplu în localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);
      if (role) {
        // Verifică dacă rolul există înainte de a încerca să-l salvezi
        localStorage.setItem("userRole", role);
      } else {
        console.error("Role is missing from the response");
      }
      console.log("Saved role:", localStorage.getItem("userRole"));
      console.log("Successfully logged in!", response.data);
      // Redirecționează utilizatorul către pagina de home după autentificare
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error.response || error);
      // Gestionează erorile specifice bazate pe codul de stare al răspunsului
      if (error.response && error.response.status === 404) {
        setEmailNotFoundError(true);
      } else if (error.response && error.response.status === 401) {
        setIncorrectPasswordError(true);
      }
    }
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
