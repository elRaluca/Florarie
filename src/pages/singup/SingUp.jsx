import "./singup.css";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import { Users } from "../../data.js";

const SingUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

      setPasswordError({
        isError: !passwordRegex.test(value),
        message:
          "Password must have at least 8 characters, at least one uppercase letter, and at least one number.",
      });
    }
    if (name === "confirmPassword") {
      const confirmPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

      setConfirmPasswordError({
        isError: !confirmPasswordRegex.test(value),
        message:
          "Password must have at least 8 characters, at least one uppercase letter, and at least one number.",
      });
    }
    // Verifică dacă parolele coincid
    if (formData.password !== value) {
      setConfirmPasswordError({
        isError: true,
        message: "Passwords do not match. Please try again.",
      });
    } else {
      setConfirmPasswordError({
        isError: false,
        message: "",
      });
    }

    if (name === "email") {
      setEmailError(false);
    }
    if (name === "username") {
      setUsernameError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Resetarea tuturor stărilor de eroare la începutul validării
    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    // Verifică dacă adresa de email este introdusă
    if (!formData.email.trim()) {
      setEmailError(true);
      console.log("Please enter an email address.");
    }

    // Verifică dacă username-ul este introdus
    if (!formData.username.trim()) {
      setUsernameError(true);
      console.log("Please enter a username.");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(true);
      console.log(
        "Password must have at least 8 characters, at least one uppercase letter, and at least one number."
      );
    }
    // Verifică dacă parolele coincid
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      console.log("Passwords differ.");
    }

    // Verifică dacă parola este introdusă
    if (!formData.password.trim()) {
      setPasswordError(true);
      console.log("Please enter a password.");
    }

    // Verifică dacă adresa de email există deja
    const existingEmail = Users.find((user) => user.email === formData.email);
    if (existingEmail) {
      setEmailError(true);
      console.log(
        `Email ${formData.email} already exists. Please choose another.`
      );
    }

    // Aici poți adăuga logica pentru trimiterea datelor către server sau altă acțiune
    if (!emailError && !usernameError && !passwordError) {
      console.log("Form data:", formData);
    }
  };

  const handleGoogleSignUp = () => {
    // Redirect sau alte acțiuni pentru autentificarea cu Google
    window.location.href = "URL-ul-de-autentificare-cu-Google";
  };

  const handleFacebookSignUp = () => {
    // Redirect sau alte acțiuni pentru autentificarea cu Facebook
    window.location.href = "URL-ul-de-autentificare-cu-Facebook";
  };

  return (
    <section className="singup">
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
            <h2>Create Account</h2>

            <div className="singup_with">
              <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
              <button onClick={handleFacebookSignUp}>
                Sign Up with Facebook
              </button>
            </div>
            <h3>OR</h3>

            <form className="singUp_Form" onSubmit={handleSubmit}>
              <label className="singUp_label">
                {formData.username.length === 0 && <span>Name</span>}
                <input
                  className={`singUp_input ${usernameError ? "error" : ""}`}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label className="singUp_label">
                {formData.email.length === 0 && <span>Email</span>}
                <input
                  className={`singUp_input ${emailError ? "error" : ""}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label className="singUp_label">
                {formData.password.length === 0 && <span>Password</span>}
                <input
                  className={`singUp_input ${
                    passwordError.isError ? "error" : ""
                  }`}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ borderColor: passwordError.isError ? "red" : "" }}
                />
              </label>
              {passwordError.isError && (
                <p className="error_message">{passwordError.message}</p>
              )}
              <br />
              <label className="singUp_label">
                {formData.confirmPassword.length === 0 && (
                  <span>Confirm Password</span>
                )}
                <input
                  className={`singUp_input ${
                    confirmPasswordError.isError ? "error" : ""
                  }`}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{
                    borderColor: confirmPasswordError.isError ? "red" : "",
                  }}
                />
              </label>
              {confirmPasswordError.isError && (
                <p className="error_message">{confirmPasswordError.message}</p>
              )}
              <br />

              <div className="create">
                <button type="submit">Create Account</button>
              </div>
            </form>
            <div className="login">
              <p>Already have an account?</p>
              <Link to="/login">
                <button>Log In.</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default SingUp;
