import React, { useState } from "react";
import Image from "../../images/logo.png";
import { Users } from "../../data.js";
import { Link } from "react-router-dom";
import "./recoveraccount.css";

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

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const email = formData.email.trim();
    const emailExists = !!Users.find((user) => user.email === email);

    setFormData({
      ...formData,
      submittedEmail: true,
      submittedCode: false,
      isEmailEmpty: !email,
      emailExists: emailExists,
    });

    if (emailExists) {
      setSendButtonClicked(true);
      setEmailSubmittedAndValid(true);
      const generatedCode = generateVerificationCode();
      setVerificationCode(generatedCode);
      console.log("Generated Verification Code:", generatedCode);
    } else {
      setSendButtonClicked(false);
      setEmailSubmittedAndValid(false);
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    if (formData.code === verificationCode) {
      console.log("Verification successful. Continue with account recovery.");
      setIsVerificationCodeCorrect(true);
      setIsCodeVerified(true);

      setShowPasswordSection(true);
      setShowCodeSection(false);
    } else {
      console.error("Incorrect verification code. Please try again.");
      setIsVerificationCodeCorrect(false);
    }

    setIsCodeEntered(true);
    setIsRetryingPassword(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.password);

    if (formData.password === formData.confirmPassword && isPasswordValid) {
      console.log(
        "Passwords match and meet the criteria. Continue with account recovery."
      );
      setFormData({
        ...formData,
        submittedPassword: true,
        passwordChangeSuccess: true,
      });
    } else {
      // Display error message only if passwords are not matching
      if (formData.password !== formData.confirmPassword) {
        console.error("Passwords do not match. Please try again.");
        setPasswordsMatch(false);
        setIsRetryingPassword(true);
      }
      // Display error message for invalid password format
      if (!isPasswordValid) {
        console.error(
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number."
        );
        setPasswordsMatch(false);
        setIsRetryingPassword(true);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    // Verificare condiții pentru parolă
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newPassword);

    // Verificare dacă prima parolă nu îndeplinește condițiile
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

              {((formData.submittedEmail && !formData.emailExists) ||
                (formData.submittedEmail &&
                  formData.emailExists &&
                  formData.isEmailEmpty)) && (
                <div className="error_message">
                  {formData.isEmailEmpty
                    ? "Please enter your email address."
                    : "Account not found. Please check the entered email address."}
                </div>
              )}
              <div className="sendBt">
                <button type="submit" className="sendBt">
                  SEND
                </button>
              </div>
            </form>
          )}

          {emailSubmittedAndValid && sendButtonClicked && showCodeSection && (
            <form onSubmit={handleCodeSubmit}>
              <label className="recover_label">
                {formData.code.length === 0 && (
                  <span>Enter the code received by email</span>
                )}

                <input
                  className={`recover_input ${
                    isCodeEntered && !isVerificationCodeCorrect ? "error" : ""
                  }`}
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value,
                    })
                  }
                />
              </label>
              {isCodeEntered && !isVerificationCodeCorrect && (
                <div className="error_message">
                  <p>Incorrect verification code. Please try again.</p>
                </div>
              )}
              <div className="sendBt">
                <button type="submit" className="sendBt">
                  SEND
                </button>
              </div>
            </form>
          )}

          {isCodeVerified && showPasswordSection && (
            <div>
              {formData.passwordChangeSuccess ? (
                <div className="success_message">
                  <p>Password changed successfully!</p>
                  <Link to="/login" className="btn lg">
                    Log In
                  </Link>
                </div>
              ) : (
                <form className="recover_form" onSubmit={handlePasswordSubmit}>
                  <div className="password_fields">
                    <label className="recover_label">
                      {formData.password.length === 0 && (
                        <span>New password</span>
                      )}

                      <input
                        className={`recover_input ${
                          !passwordsMatch && isRetryingPassword ? "error" : ""
                        }`}
                        type="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                      />
                    </label>
                    {isRetryingPassword && (
                      <div className="error_message">
                        Password must have at least 8 characters, one uppercase
                        letter, one lowercase letter, and one number.
                      </div>
                    )}

                    <label className="recover_label">
                      {formData.confirmPassword.length === 0 && (
                        <span>Confirm password</span>
                      )}

                      <input
                        className={`recover_input ${
                          !passwordsMatch ? "error" : ""
                        }`}
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        onInput={handleConfirmPasswordChange}
                      />
                    </label>
                    {!passwordsMatch && (
                      <div className="error_message">
                        Passwords do not match. Please try again.
                      </div>
                    )}

                    <div className="sendBt">
                      <button type="submit" className="sendBt">
                        SEND
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
        <div className="recover_right">
          <h2>Blossom Boutique</h2>
        </div>
      </div>
    </section>
  );
};

export default RecoverAccount;
