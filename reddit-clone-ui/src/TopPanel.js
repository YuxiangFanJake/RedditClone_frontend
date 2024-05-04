import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import LoginPage from './LoginPage';
import SignUpForm from './SignUpForm';

const TopPanel = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
    const [username, setUsername] = useState(''); // Username to display
    let navigate = useNavigate(); 

    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => {
        setShowLogin(false);
        setIsLoggedIn(true);
        setUsername('JohnDoe'); // Set a username upon login for demonstration
        setShowDropdown(false);
    };

    const handleShowSignUp = () => setShowSignUp(true);
    const handleCloseSignUp = () => {
        setShowSignUp(false);
        setShowDropdown(false);
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setUsername(''); // Clear username
    };

    const handleCompose = () => {
        navigate('/compose'); // Navigate to /compose route
    };

    const handleHomeButton = () => {
        navigate('/'); // Navigate to home
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <header className="bg-white shadow p-4">
            <Modal show={showLogin} onHide={handleCloseLogin}>
                <LoginPage onHide={handleCloseLogin} />
            </Modal>
            <Modal show={showSignUp} onHide={handleCloseSignUp}>
                <SignUpForm onHide={handleCloseSignUp} />
            </Modal>
            <div className="container mx-auto flex justify-between items-center">
                <button className="text-xl font-bold" onClick={handleHomeButton}>Reddit Clone</button>
                <input type="search" placeholder="Search" className="px-4 py-2 border rounded" />
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <div className="relative">
                                <button className="text-sm" onClick={toggleDropdown}>
                                    {username}
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                                        <button className="text-sm text-left w-full px-4 py-2 hover:bg-gray-100" onClick={handleSignOut}>Sign Out</button>
                                    </div>
                                )}
                            </div>
                            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded" onClick={handleCompose}>Compose</button>
                        </>
                    ) : (
                        <>
                            <button className="text-sm" onClick={handleShowLogin}>Log In</button>
                            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded" onClick={handleShowSignUp}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopPanel;
