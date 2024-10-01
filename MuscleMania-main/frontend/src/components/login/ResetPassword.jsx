import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Spin, Alert } from "antd";
import { useNavigate } from 'react-router-dom';
import { FaDumbbell } from "react-icons/fa";
import MuscleMania from '../../Images/MuscleMania.png';
import squat from '../../Images/squat.png';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState(""); // State for reset token
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // State to track success status
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Requesting reset token for email:", email);

      // Fetch reset token from the server
      const tokenResponse = await fetch("http://localhost:4999/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!tokenResponse.ok) {
        const errorMessage = await tokenResponse.text();
        throw new Error(`Error retrieving reset token: ${errorMessage}`);
      }

      const tokenData = await tokenResponse.json();
      const receivedResetToken = tokenData.resetToken;

      console.log("Received reset password request for email:", email);
      console.log("Received reset token:", receivedResetToken);

      // Retrieve the reset token from storage
      const storedResetToken = sessionStorage.getItem('resetToken');

      // Check if the reset token from storage matches the received reset token
      if (storedResetToken !== resetToken) {
        throw new Error("Invalid reset token");
      }

      console.log("Stored reset token:", storedResetToken);
      console.log("Received reset token:", receivedResetToken);

      // Send the reset request with the received token
      const resetResponse = await fetch(`http://localhost:4999/reset-password/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password, resetToken: receivedResetToken }), 
      });

      if (!resetResponse.ok) {
        const errorMessage = await resetResponse.text();
        throw new Error(`Error resetting password: ${errorMessage}`);
      }
      setMessage("Password reset successfully");
      setSuccess(true);
      setIsLoading(false);
      navigate("/login"); // Redirect to login page after successful reset

      // Reset form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setResetToken(""); 
    } catch (error) {
      setMessage(error.message);
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className='header1'>
        <header>
          <button className="ReturnButton" onClick={() => navigate('/')}>Back</button>
        </header>
      </div>
      <div>
        <img src={squat} alt="squat" className="squat" />
      </div>
      <Card className="reset-password-card">
        <img src={MuscleMania} alt="MuscleMania" className="MuscleMania" />
        <Typography.Title level={2}><FaDumbbell style={{ marginRight: "0.5em" }} />MuscleMania</Typography.Title>
        <Typography.Text type="secondary">Reset Password Page</Typography.Text>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!", type: "email" }]}
          >
            <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Reset Token"
            name="resetToken"
            rules={[{ required: true, message: "Please input your reset token!" }]}
          >
            <Input placeholder="Enter your reset token" value={resetToken} onChange={(e) => setResetToken(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[ 
              { required: true, message: "Please input your new password!" },
              { min: 6, message: "Must be 6 characters or more!" }
          ]}
          >
            <Input.Password
            placeholder="Enter new password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[{
              required: true,
              message: "Please confirm your new password!",
            }]}
          >
            <Input.Password 
            placeholder="Confirm new password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => {
              if (password !== confirmPassword) {
                setMessage("Passwords do not match");
              } else {
                setMessage("");
              }
            }}
             />
          </Form.Item>

          {message && <Alert message={message} type="error" showIcon className="alert" />}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? <Spin /> : 'Reset Password'}
            </Button>
          </Form.Item>
        </Form>
        {message && <Alert message={message} type={success ? "success" : "error"} showIcon className="alert" />}
      </Card>
    </div>
  );
};

export default ResetPassword;

