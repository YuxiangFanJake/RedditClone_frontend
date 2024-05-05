import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SignUpForm = ({ onHide }) => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(""); // State to handle any signup errors
  const [success, setSuccess] = useState(""); // State to handle success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const apiBaseUrl = 'http://localhost:3000/api/v1';
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        setSuccess("Signup successful! You can now log in."); // Set success message
        setTimeout(() => setSuccess(""), 5000);  // Clear success message after 5 seconds
      } else {
        setError(data.message || "Unable to sign up"); // Handle backend errors
        console.log(data.message)
        setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
      }
    } catch (error) {
      setError(error.message);
      console.error('Signup failed:', error);
      setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
    }
  };

  return (
    <Modal.Body>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            required
            onChange={handleChange}
            value={signupData.username}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={signupData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={signupData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Modal.Body>
  );
};

export default SignUpForm;
