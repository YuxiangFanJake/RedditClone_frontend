import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateCommunityForm = () => {
const [communityData, setCommunityData] = useState({
    name: '',
    community_type: '',
    is_NSFW: false,
    });

  const [error, setError] = useState(""); // State to handle any signup errors
  const [success, setSuccess] = useState(""); // State to handle success message
  const apiBaseUrl = 'http://localhost:3000/api/v1';
  let navigate = useNavigate();
  
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setCommunityData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancel = () => navigate('/');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Community Data:', communityData);
    // Here you would typically send this data to your backend server
    try {
        const response = await fetch(`${apiBaseUrl}/new-community`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(communityData),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log('Successfully created a new community.', data);
          setSuccess("Successfully created a new community."); // Set success message
          setTimeout(() => setSuccess(""), 5000);  // Clear success message after 5 seconds
        } else {
          setError(data.message || "Fail to created a new community."); // Handle backend errors
          console.log(data.message)
          setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
        }
      } catch (error) {
        setError(error.message);
        console.error('Fail to created a new community:', error);
        setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
      }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <h2 className="text-2xl font-bold mb-6 text-center">Create a community</h2>
        
        <div className="mb-4">
          <label htmlFor="communityName" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={communityData.name}
            onChange={handleChange}
            maxLength={21}
            required
          />
          <p className="text-gray-600 text-xs italic">{21 - communityData.name.length} Characters remaining</p>
        </div>

        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">Community type</span>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                id="public"
                name="community_type"
                value="public"
                checked={communityData.community_type === 'public'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Public</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                id="restricted"
                name="community_type"
                value="restricted"
                checked={communityData.community_type === 'restricted'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Restricted</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                id="private"
                name="community_type"
                value="private"
                checked={communityData.community_type === 'private'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Private</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="nsfw"
              name = "is_NSFW"
              checked={communityData.is_NSFW}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-red-600"
            />
            <span className="ml-2 text-gray-700">NSFW 18+ year old community</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
            Create Community
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommunityForm;
