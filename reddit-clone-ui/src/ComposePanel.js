import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { flushSync } from 'react-dom';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [community, setCommunity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to handle any signup errors
  const [success, setSuccess] = useState(""); // State to handle success message
  const { user } = useAuth();
  const [composeData, setComposeData] = useState({
    subject: '',
    content: '',
    author: '',
    community:'',
  });

  useEffect(() => {
    console.log("Updated composeData:", composeData);
  }, [composeData]); // This effect runs whenever composeData changes.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComposeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCommunityChange = (communityName) => {
    setComposeData(prevState => ({
      ...prevState,
      community: communityName
    }));
  };

  const updateAuthorName = (authorName) => {
    flushSync(() => {
      setComposeData(prevState => ({
        ...prevState,
        author: authorName
      }));
    });
  };

  const apiBaseUrl = 'http://localhost:3000/api/v1';
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateAuthorName(user)
    try {
      const response = await fetch(`${apiBaseUrl}/new-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(composeData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Successful created a post:', data);
        setSuccess("Successful created a post:."); // Set success message
        setTimeout(() => setSuccess(""), 5000);  // Clear success message after 5 seconds
      } else {
        setError(data.message || "Fail to create a post."); // Handle backend errors
        console.log(data.message)
        setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
      }
    } catch (error) {
      setError(error.message);
      console.error('Fail to create a post:', error);
      setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
    }
  };

  const handleCommunitySearch = async (e) => {
    const value = e.target.value;
    handleCommunityChange(value)
    if (value.length > 1) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/v1/search-subreddit?name=${encodeURIComponent(value)}`);
        const data = await response.json();
        if (response.ok) {
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSearchResults([]);
      }
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="community" className="block mb-2">Community</label>
          <input
            type="text"
            id="community"
            className="block w-full border-gray-300 rounded-md shadow-sm"
            value={composeData.community}
            onChange={handleCommunitySearch}
            placeholder="Type to search community"
          />
          {loading && <p>Loading...</p>}
          {searchResults.length > 0 && (
            <ul className="absolute bg-white border mt-1 rounded w-full">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    //setCommunity(result.name);
                    console.log(result.name)
                    handleCommunityChange(result.name)
                    setSearchResults([]);
                  }}
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title*</label>
          <input
            type="text"
            id="title"
            required
            maxLength="300"
            className="block w-full border-gray-300 rounded-md shadow-sm"
            name='subject'
            value={composeData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block mb-2">Body</label>
          <textarea
            id="body"
            className="block w-full border-gray-300 rounded-md shadow-sm"
            rows="4"
            name='content'
            value={composeData.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
          <button type="button" className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 mr-2">Save draft</button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
