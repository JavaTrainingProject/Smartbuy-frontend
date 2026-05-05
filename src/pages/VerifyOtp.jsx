import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"
import axiosInstance from "../services/axiosInstance";

function VerifyOtp(){
    const navigate = useNavigate();

    const[otp, setOtp] = useState("");
    const[message, setMessage] = useState("");

    const storedOtp = localStorage.getItem("otp");
    const expiry = localStorage.getItem("otp_expiry");
    const email = localStorage.getItem("otp_email");
    

    const handleVerify = async () => {
  try {
    const email = localStorage.getItem("otp_email");

    const res = await axiosInstance.post(
      `/auth/verify?email=${email}&otp=${otp}`
    );

    setMessage(res.data);

    setTimeout(() => navigate("/"), 500);

  } catch (err) {
    setMessage(err.response?.data || "Invalid OTP");
  }
};

        const handleResend = async () =>{
        const email = localStorage.getItem("otp_email");
        const res = await axiosInstance.post(`/auth/resend?email=${email}`);
       

        localStorage.setItem("otp",res.data);
        localStorage.setItem("otp_expiry", Date.now() +5*60*1000);
        setMessage("OTP resent successfully");
    };

    return(
        <div className="login-container">
            <div className="login-right">
                <div className="login-card">
                    <h2 className="login-title">Verify Email</h2>

                    <p style={{marginBottom: "10px"}}>
                        OTP sent to <b>{email}</b>
                    </p>

                    <div className="form-group">
                        <label>Enter OTP</label>
                        <input type="text" value={otp} maxLength={6} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" />
                    </div>

                    {message && (
                        <p className="error-text" style={{color:message.includes("success") ? "green" : "red",}}
                        >{message}</p>
                    )}

                    <button className="login-btn" onClick={handleVerify}>Verify OTP</button>

                    <p style={{marginTop: "10px", cursor:"pointer", color:"blue"}} onClick={handleResend}>Resend OTP</p>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;