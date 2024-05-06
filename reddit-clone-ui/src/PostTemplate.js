import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { flushSync } from 'react-dom';
import Post from './Post.js'
import Comment from './Comment.js'


const PostTemplate = () => {
  const { postId } = useParams(); // Get the current page from the URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [commentData, setCommentData] = useState({
    content: '',
    author: '',
    post_id:'',
  });

  const updateAuthorName = (authorName) => {
    flushSync(() => {
        setCommentData(prevState => ({
        ...prevState,
        author: authorName,
        post_id:postId
      }));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const apiBaseUrl = 'http://localhost:3000/api/v1';
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/new-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Successful created a comment:', data);
        //setTimeout(() => setSuccess(""), 5000);  // Clear success message after 5 seconds
      } else {
        setError(data.message || "Fail to create a comment."); // Handle backend errors
        console.log(data.message)
        setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
      }
    } catch (error) {
      setError(error.message);
      console.error('Fail to create a comment:', error);
      setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
    }
  };

  
  useEffect(() => {
    updateAuthorName(user)
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/v1/fetch-post?postId=${encodeURIComponent(postId)}`);
          const data = await response.json();
          if (response.ok) {
            //setSuccess("Successfully created a post:."); // Set success message
            //setTimeout(() => setSuccess(""), 5000);  // Clear success message after 5 seconds
            console.log({postId})
            setData(data); // Assuming the API returns an array of data
            console.log('Successfully fetched the content:', data);
          } else {
            setError(data.message || "Fail to load posts."); // Handle backend errors
            console.log(data.message)
            setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
          }
      } catch (err) {
        setError(error.message);
        console.error('Fail to load posts:', error);
        setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]); // Re-fetch when the page changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {data.map((item, index) => (
        <div key={index}>
        {index === 0 && (
        <Post
            subreddit={item.post_community}  // Ensure postId is correctly defined or passed as a prop
            title={item.subject}
            content={item.post_content}
            upvotes={item.post_vote}
            comments={item.post_vote}
        />
        )}
        {
        item.comment_id !== null && 
        item.comment_content !== null && 
        item.comment_vote !== null && 
        item.comment_author !== null && (
        <Comment
            key={item.comment_id}
            id={item.comment_id}
            content={item.comment_content}
            upvotes={item.comment_vote}
            author={item.comment_author}
        />
        )}
        </div>
      ))}
    <form onSubmit={handleSubmit}>
          <textarea
            id="comment"
            className="block w-full border-gray-300 rounded-md shadow-sm"
            rows="2"
            name='content'
            value={commentData.content}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">comment</button>
    </form>
    </div>

  );
};

export default PostTemplate;
