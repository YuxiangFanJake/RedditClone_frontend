import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpForm from './SignUpForm';
import { useAuth } from './AuthContext';

const TopPanel = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState('');
    const [communities, setCommunities] = useState([]);
    const { user, logout } = useAuth();
    let navigate = useNavigate();

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearch(value);
        if (value.length > 1) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/search-subreddit?name=${encodeURIComponent(value)}`);
                const data = await response.json();
                if (response.ok) {
                    setCommunities(data);
                } else {
                    setCommunities([]);
                }
            } catch (error) {
                setCommunities([]);
            }
        } else {
            setCommunities([]);
        }
    };

    const handleSelectCommunity = (communityName) => {
        navigate(`/community/${communityName}`);
        setCommunities([]);
        setSearch('');
    };

    const handleCloseLogin = () => setShowLogin(false);
    const handleLoginSuccess = (username) => {
        setShowDropdown(false);
    };
    const handleShowSignUp = () => setShowSignUp(true);
    const handleCloseSignUp = () => {
        setShowSignUp(false);
        setShowDropdown(false);
    }
    const handleCompose = () => navigate('/compose');
    const handleNewCommunity = () => navigate('/new-community');
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
                <div className="relative">
                    <input type="search" placeholder="Search community" className="px-4 py-2 border rounded"
                        value={search} onChange={handleSearchChange} />
                    {communities.length > 0 && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-xl">
                            {communities.map((community, index) => (
                                <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectCommunity(community.name)}>
                                    {community.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <div className="relative">
                                <button className="text-sm" onClick={toggleDropdown}>
                                    Welcome: {user}
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                                        <button className="text-sm text-left w-full px-4 py-2 hover:bg-gray-100" onClick={logout}>Sign Out</button>
                                    </div>
                                )}
                            </div>
                            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded" onClick={handleCompose}>New Post</button>
                            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded" onClick={handleNewCommunity}>New Community</button>
                        </>
                    ) : (
                        <>
                            <button className="text-sm" onClick={() => setShowLogin(true)}>Log In</button>
                            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded" onClick={handleShowSignUp}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopPanel;
