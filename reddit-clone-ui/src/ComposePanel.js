import React, { useState } from 'react';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [community, setCommunity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle submitting the form data to your backend or service
    console.log({ title, body, community });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="community" className="block mb-2">Select a community</label>
          <select
            id="community"
            className="block w-full border-gray-300 rounded-md shadow-sm"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          >
            <option value="">Select a community</option>
            <option value="CMU">CMU</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title*</label>
          <input
            type="text"
            id="title"
            required
            maxLength="300"
            className="block w-full border-gray-300 rounded-md shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="body" className="block mb-2">Body</label>
          <textarea
            id="body"
            className="block w-full border-gray-300 rounded-md shadow-sm"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {/* Here you can add buttons or tabs for Text, Images & Video, Link, Poll */}
          </div>
          <div>
            <button type="button" className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 mr-2">Save draft</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
