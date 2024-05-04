import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './LoginPage.css'; 

const LoginPage = ({ onHide }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(""); // State to handle any login errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const apiBaseUrl = 'http://localhost:3000/api/v1';
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your backend
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        onHide(); // Close the modal on successful login
      } else {
        throw new Error(data.message || "Unable to login"); // Handle errors like invalid credentials
      }
    } catch (error) {
      setError(error.message);
      console.error('Login failed:', error);
    }
  };

  return (
    <Modal.Body>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Form fields */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            required
            onChange={handleChange}
            value={loginData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </Modal.Body>
  );
};

export default LoginPage;
