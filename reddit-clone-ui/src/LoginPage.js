import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './LoginPage.css'; 
import { useAuth } from './AuthContext';

// LoginPage.js
const LoginPage = ({ onHide, onLoginSuccess }) => {
const { user, login } = useAuth();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(""); 

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
    setError("");  // Clear previous errors before a new request
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
        login(data.userName)
        onLoginSuccess(data.userName);  // Pass the username from the response to the parent component
        onHide(); 
      } else {
        // Use the server-provided error message or a default message if none provided
        setError(data.message || "Login failed. Please try again."); 
        setTimeout(() => setError(""), 3000);  // Clear success message after 5 seconds
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      setError("Network error or server is unreachable.");
      console.error('Login failed:', error);
      setTimeout(() => setError(""), 3000);  // Clear success message after 5 seconds
    }
  };

  return (
    <Modal.Body>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
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
