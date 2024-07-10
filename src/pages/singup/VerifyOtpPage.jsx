import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const getEmailFromQuery = () => {
    return new URLSearchParams(location.search).get("email");
  };

  useEffect(() => {
    const email = getEmailFromQuery();
    console.log(`Email for OTP verification: ${email}`);
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = getEmailFromQuery();

    try {
      const response = await fetch("http://localhost:8060/public/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok) {
        console.log("OTP verified successfully:", data);
        navigate("/login");
      } else {
        setError(
          typeof data === "string"
            ? data
            : data.error || "The code is incorrect."
        );
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setError("An error occurred while verifying the code. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    const email = getEmailFromQuery();

    try {
      const response = await fetch("http://localhost:8060/public/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok) {
        setResponseMessage(typeof data === "string" ? data : data.message);
      } else {
        setResponseMessage(
          typeof data === "string"
            ? data
            : data.error || "Failed to resend OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
      setResponseMessage(
        "An error occurred while resending the OTP. Please try again."
      );
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
          <button
            className="RetrimiteCod"
            type="button"
            onClick={handleResendOtp}
          >
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
