import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import MuscleMania from '../../Images/MuscleMania.png';
import squat from '../../Images/squat.png';
import { FaDumbbell } from "react-icons/fa";
import sendToken from '../../utils/sendResetEmail';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleForgotPassword = async () => {
    try {
      const response = await fetch("http://localhost:4999/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const tokenData = await response.json();
      const resetToken = tokenData.resetToken;
  
      // Store the reset token securely (e.g., in sessionStorage)
      sessionStorage.setItem('resetToken', resetToken);

      sendToken(email, resetToken);

      setMessage(tokenData.message);
      navigate("/reset-password");
    } catch (error) {
      setMessage("There has been a problem with your fetch operation: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="header1">
        <header>
          <button className="ReturnButton" onClick={() => navigate("/")}>
            Back
          </button>
        </header>
      </div>
      <div>
        <img src={squat} alt="squat" className="squat" />
      </div>
      <Card className="login-card">
        <img src={MuscleMania} alt="MuscleMania" className="MuscleMania" />
        <Typography.Title level={2}>
          <FaDumbbell style={{ marginRight: "0.5em" }} /> MuscleMania{" "}
        </Typography.Title>
        <Typography.Text type="secondary">
          Log in to your account
        </Typography.Text>
        <Form layout="vertical" onFinish={handleForgotPassword}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not valid Email!",
              },
            ]}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          {message && (
            <Alert
              description={message}
              type="info"
              showIcon
              closable
              className="alert"
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
            >
              {isLoading ? <Spin /> : "Reset Password"}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate("/register")}>
              Don't have an account? Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
