import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Funcția pentru a obține adresa de e-mail din query-ul URL-ului
  const getEmailFromQuery = () => {
    return new URLSearchParams(location.search).get("email");
  };

  useEffect(() => {
    // Inițializează logică bazată pe email-ul primit
    const email = getEmailFromQuery();
    console.log(`Email for OTP verification: ${email}`);
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = getEmailFromQuery();

    try {
      const response = await axios.post(
        "http://localhost:8060/public/verify-otp",
        {
          email,
          otp,
        }
      );
      console.log(response.data); // Poți face ceva cu răspunsul primit, cum ar fi redirecționarea către pagina de logare
      navigate("/login"); // Exemplu de redirecționare către pagina de logare după ce OTP-ul este verificat cu succes
    } catch (error) {
      setError("The code is incorrect.");
    }
  };

  const handleResendOtp = async () => {
    const email = getEmailFromQuery();

    try {
      const response = await axios.post(
        "http://localhost:8060/public/resend-otp",
        {
          email,
        }
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response.data.error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="messageVerify">
          Activate your account <br /> by adding the code received by email
        </div>
        <div className="OtpLabel">
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button className="OtpVerifica" type="submit">
          Verifică
        </button>
        <div>
          <button className="RetrimiteCod " onClick={handleResendOtp}>
            Retrimite
          </button>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
        {error && <div className="ErrorMessage">{error}</div>}
      </form>
      <div className="RightSideVerify">Blossom Boutique</div>
    </section>
  );
}

export default VerifyOtpPage;
