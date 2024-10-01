import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, Spin, Alert, message } from "antd";
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import MuscleMania from "../../Images/MuscleMania.png";
import squat from "../../Images/squat.png";

const Login = () => {
  const { login } = useLogin();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // navigate function

  const handleLogin = async () => {
    // Client Validation for email and password
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const response = await fetch("http://localhost:4999/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const UserID = await response.json();

      if (response.ok) {
        message.success("Login successful");
        console.log("Login successful");
        console.log("Brugerens id i MongoDB:", UserID)
        sessionStorage.setItem("user_id", UserID);
        login(UserID);
        navigate("/survey");
      } else {
        throw new Error(UserID.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header1">
        <header>
          <button className="ReturnButton" onClick={() => navigate("/")}>Back</button>
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
          {" "}
          Log in to your account{" "}
        </Typography.Text>
        <Form layout="vertical" onFinish={handleLogin}>
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
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {error && (
            <Alert
              description={error}
              type="error"
              showIcon
              closable
              className="alert"
            />
          )}

          <Form.Item>
            <Button
              type={loading ? "default" : "primary"}
              htmlType="submit"
              className="login-form-button"
            >
              {loading ? <Spin /> : "Sign In"}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate("/register")}>
              Don't have an account? Register
            </Button>
          </Form.Item>
          {/* Add forgot password button */}
          <Form.Item>
            <Button type="link" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;