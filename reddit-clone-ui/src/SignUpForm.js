import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement form submission logic here
    alert('Sign Up form submitted');
  };

  return (
    <Modal.Body>
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            required
            onChange={handleChange}
            value={formData.confirmPassword}
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
