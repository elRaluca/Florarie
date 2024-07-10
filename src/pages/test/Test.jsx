import React, { useState } from "react";
import Image from "../../images/logo.png";
import { Users } from "../../data.js";
import { Link } from "react-router-dom";
import "./recoveraccount.css";
import { useNavigate } from "react-router-dom";

const RecoverAccount = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const initialFormData = {
    email: "",
    submittedEmail: false,
    code: "",
    submittedCode: false,
    isEmailEmpty: true,
    emailExists: true,
    password: "",
    confirmPassword: "",
    submittedPassword: false,
    passwordChangeSuccess: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);
  const [emailSubmittedAndValid, setEmailSubmittedAndValid] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationCodeCorrect, setIsVerificationCodeCorrect] =
    useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [showCodeSection, setShowCodeSection] = useState(true);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isRetryingPassword, setIsRetryingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSendButtonClicked(true);

    const email = formData.email.trim();
    setFormData((prevState) => ({
      ...prevState,
      submittedEmail: true,
      isEmailEmpty: !email,
    }));

    if (!email) {
      setEmailSubmittedAndValid(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8060/public/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVerificationCode(data.generatedCode); // assuming server sends this
        setEmailSubmittedAndValid(true);
        setShowCodeSection(true);
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Failed to process the email:", error.message);
      setEmailSubmittedAndValid(false);
      setFormData((prevState) => ({
        ...prevState,
        emailExists: false,
      }));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setIsRetryingPassword(true);
      setErrorMessage("Password must meet the required criteria.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8060/public/set-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            resetCode: formData.code,
            newPassword: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      if (response.ok) {
        setFormData({ ...initialFormData, passwordChangeSuccess: true });
        navigate("/login");
        setErrorMessage(""); // Clear any error messages
      } else {
        throw new Error(
          "Failed to reset password. Server responded with status: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Error during password reset:", error.message);
      setIsRetryingPassword(true);
      setErrorMessage(
        "Failed to reset password. Please check your verification code and try again."
      );
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const isPasswordValid = passwordRegex.test(newPassword);

    if (!isPasswordValid && newPassword.trim().length >= 8) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }

    setFormData({
      ...formData,
      password: newPassword,
    });
  };

  const handleConfirmPasswordChange = () => {
    setIsRetryingPassword(false);
    setPasswordsMatch(true);
  };

  return (
    <section className="recoveracc">
      <div className="container_recover">
        <div className="recover_left">
          {!formData.passwordChangeSuccess && (
            <div className="ask">
              <span>Forgot your account password?</span>
            </div>
          )}
          {(!emailSubmittedAndValid ||
            !sendButtonClicked ||
            formData.submittedCode) && (
            <form onSubmit={handleEmailSubmit}>
              <label
                className={`recover_label ${formData.email ? "filled" : ""} ${
                  (formData.submittedEmail && !formData.emailExists) ||
                  (formData.submittedEmail &&
                    formData.emailExists &&
                    formData.isEmailEmpty)
                    ? "error"
                    : ""
                }`}
              >
                {formData.email.length === 0 && (
                  <span>Enter the account email</span>
                )}

                <input
                  className={`recover_input ${
                    (formData.submittedEmail && !formData.emailExists) ||
                    (formData.submittedEmail &&
                      formData.emailExists &&
                      formData.isEmailEmpty)
                      ? "error"
                      : ""
                  }`}
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                      isEmailEmpty: !e.target.value.trim(),
                      emailExists: true,
                    })
                  }
                />
              </label>

              <div className="sendBt">
                <button type="submit" className="sendBt">
                  SEND
                </button>
              </div>
            </form>
          )}
          {emailSubmittedAndValid && sendButtonClicked && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="recover_fields">
                <label className="recover_label">
                  <input
                    className={`recover_input ${
                      formData.isEmailEmpty ? "error" : ""
                    }`}
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </label>
                <label className="recover_label">
                  <input
                    className="recover_input"
                    type="text"
                    placeholder="Verification Code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                  {isCodeEntered && !isVerificationCodeCorrect && (
                    <div className="error_message">
                      The verification code is incorrect.
                    </div>
                  )}
                </label>
                <label className="recover_label">
                  <input
                    className={`recover_input ${
                      !passwordsMatch && isRetryingPassword ? "error" : ""
                    }`}
                    type="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                  />
                </label>
                <label className="recover_label">
                  <input
                    className={`recover_input ${
                      !passwordsMatch ? "error" : ""
                    }`}
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </label>
                {isCodeEntered && !isVerificationCodeCorrect && (
                  <div className="error_message">
                    Incorrect verification code. Please try again.
                  </div>
                )}
                {!passwordsMatch && (
                  <div className="error_message">
                    Passwords do not match. Please try again.
                  </div>
                )}
                <div className="sendBt">
                  <button type="submit" className="sendBt">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="recover_right">
          <h2>Blossom Boutique</h2>
        </div>
        <div className="container_recover">
          {errorMessage && <div className="error_message">{errorMessage}</div>}
          {emailErrorMessage && (
            <div className="error_message">{emailErrorMessage}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecoverAccount;
