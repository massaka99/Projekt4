import React, { useState } from "react";
import "./Contact.css";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "./content_option";
import { useNavigate } from 'react-router-dom';
import sendEmail from '../utils/sendEmail'; 
import toast from 'react-hot-toast';

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // skriver personens mail her i message 
    const predefinedText = `\n\n\nPersonen der har sendt beskeden har denne mail: ${email}`;
    // samler det
    const fullMessage = message + predefinedText;

    toast.promise(
      //sendEmail(null, name, null, fullMessage),
      {
        loading: 'Sending email...',
        success: 'Email sent successfully!',
        error: 'Failed to send email'
      }
    ).then(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    });
  };

  return (
    <Container>
      <div className="header1">
        <header>
          <button className="ReturnButton" onClick={() => navigate("/")}>Back</button>
        </header>
      </div>
      <Row className="mb-5 mt-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Contact os</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
          <h3 className="color_sec py-4">Get in touch</h3>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />
            {contactConfig.hasOwnProperty("YOUR_FONE") ? (
              <p>
                <strong>Phone:</strong> {contactConfig.YOUR_FONE}
              </p>
            ) : (
              ""
            )}
          </address>
          <p>{contactConfig.description}</p>
        </Col>
        <Col lg="7" className="d-flex align-items-center">
          <form className="contact__form w-100" onSubmit={handleSubmit}>
            <Row>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows="5"
              required
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <br />
            <Row>
              <Col lg="12" className="form-group">
                <button className="btn ac_btn" type="submit">
                  Send
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}