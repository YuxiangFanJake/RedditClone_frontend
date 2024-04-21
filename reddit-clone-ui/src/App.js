import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import LoginPage from './LoginPage'; // Your LoginPage component
import SignUpForm from './SignUpForm'; // Your SignUpForm component

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowSignUp = () => setShowSignUp(true);
  const handleCloseSignUp = () => setShowSignUp(false);

  return (
    <Router>
      <div className="App">
        {/* Main Page Content */}
        <div>
          <h1>Welcome to the Reddit Clone</h1>
          <p>This is the main page of the application.</p>
          <Button variant="link" onClick={handleShowLogin}>Log In</Button>
          <Button variant="link" onClick={handleShowSignUp}>Sign Up</Button>
        </div>

        {/* Login Modal */}
        <Modal show={showLogin} onHide={handleCloseLogin}>
            <LoginPage onHide={handleCloseLogin} />
        </Modal>

        {/* Sign Up Modal */}
        <Modal show={showSignUp} onHide={handleCloseSignUp}>
            <SignUpForm onHide={handleCloseSignUp} />
        </Modal>

        {/* Other routes and application content can be placed here */}
      </div>
    </Router>
  );
};

export default App;
