import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpForm from './SignUpForm';

const TopPanel = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState('');
    const [search, setSearch] = useState('');
    const [communities, setCommunities] = useState([]); // Mock community list based on search
    let navigate = useNavigate();

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearch(value);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/search-subreddit?name=${encodeURIComponent(value)}`);
            const data = await response.json();
            if (response.ok) {
                console.log('successfully retrieved subreddit data:', data);
                if (data.length > 0) { // Trigger search when there are at least 2 characters
                    setCommunities(data)
                }
            } else {
                // Use the server-provided error message or a default message if none provided
                console.error('cannot find subreddit:', data);
                setCommunities([]);
              }
            } catch (error) {
              setCommunities([]);
              console.error('cannot find subreddit because of error:', error);
            }
    };

    const handleSelectCommunity = (community) => {
        navigate(`/community/${community}`); // Assuming the URL to community page
        setCommunities([]); // Clear search results
        setSearch(''); // Clear search input
    };

    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleLoginSuccess = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
        setShowDropdown(false);
        handleCloseLogin();
    };
    const handleShowSignUp = () => setShowSignUp(true);
    const handleCloseSignUp = () => {
        setShowSignUp(false);
        setShowDropdown(false);
    }
    const handleSignOut = () => {
        setIsLoggedIn(false);
        setUsername('');
    };
    const handleCompose = () => navigate('/compose');
    const handleHomeButton = () => navigate('/');
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <header className="bg-white shadow p-4">
            <Modal show={showLogin} onHide={handleCloseLogin}>
                <LoginPage onHide={handleCloseLogin} onLoginSuccess={handleLoginSuccess} />
            </Modal>
            <Modal show={showSignUp} onHide={handleCloseSignUp}>
                <SignUpForm onHide={handleCloseSignUp} />
            </Modal>
            <div className="container mx-auto flex justify-between items-center">
                <button className="text-xl font-bold" onClick={handleHomeButton}>Reddit Clone</button>
                <input type="search" placeholder="Search community" className="px-4 py-2 border rounded"
                    value={search} onChange={handleSearchChange} />
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
                    {communities.length > 0 && (
                        <div className="absolute mt-2 w-52 bg-white border rounded shadow-xl">
                            {communities.map((community, index) => (
                                <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectCommunity(community.name)}>
                                    {community.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopPanel;
