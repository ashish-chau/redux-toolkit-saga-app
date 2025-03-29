import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paymentFailed.css"; // Import your CSS file for styling

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Order Failed"
          className="icon"
        />
        <h1>Your order was not confirmed</h1>
        <p>Please check your email for further details.</p>
        <button className="back-btn" onClick={() => navigate("/products")}>
          ⬅ back to shopping
        </button>
      </div>
      <p className="footer">All rights reserved.</p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
        alt="Shopping Icon"
        className="footer-icon"
      />
    </div>
  );
};

export default PaymentFailed;
