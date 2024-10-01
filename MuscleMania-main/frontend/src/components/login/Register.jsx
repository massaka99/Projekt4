import React from 'react';
import { Alert, Card, Form, Input, Button, Typography, Spin } from 'antd';
import '../../App.css';
import MuscleMania from '../../Images/MuscleMania.png';
import { useNavigate } from 'react-router-dom';
import squat from '../../Images/squat.png';
import useRegister from '../../hooks/useRegister';
// import sendEmail from '../../utils/sendEmail'; 

const Register = () => {
    const { loading, error, registerUser } = useRegister();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form
            .validateFields()
            .then(values => {
                registerUser({
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password
                }, () => {
                    // Sender email efter der er indtastet gyldige værdier med funktionen i /utils/sendEmail
                    const message ="Welcome to MuscleMania! you are now signed up and we're excited to have you on board. Now its your time to shine!";
                    // sendEmail(values.fullName, null, values.email, message);
                    form.resetFields(); // Reset form fields on successful registration
                    navigate('/login');
                });
            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            });
    };

    return (
        <div className="register-container">
            <div className='header1'>
                <button className="ReturnButton" onClick={() => navigate('/')}>Back</button>
            </div>
            <div>
                <img src={squat} alt="squat" className="squat" />
            </div>
            <Card className="register-card">
                <img src={MuscleMania} alt="MuscleMania" className="MuscleMania" />
                <Typography.Title level={2}>MuscleMania</Typography.Title>
                <Typography.Text type="secondary">Create an account</Typography.Text>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter your full name!' }]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'The input is not valid Email!' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                            { min: 6, message: "Must be 6 characters or more!" }
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please re-enter your password!' }]}
                    >
                        <Input.Password placeholder="Re-enter your password" />
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
                            type={loading ? 'default' : 'primary'}
                            htmlType="submit"
                            className="register-form-button"
                            disabled={loading}
                        >
                            {loading ? <Spin /> : 'Create Account'}
                        </Button>
                    </Form.Item>
                    <Button type="link" onClick={() => navigate('/login')}>Already have an account? Login</Button>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
