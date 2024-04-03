import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './LoginPage.css'; 

const LoginPage = ({ onHide }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login form data:', loginData);
    onHide(); // Close the modal
  };

  return (
    <Modal.Body>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Form.Group className="mb-3">
          <Form.Label>Email or username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            required
            onChange={handleChange}
            value={loginData.username}
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
