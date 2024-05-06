import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from './Post.js'

const CommunityPage = () => {
  const { page } = useParams(); // Get the current page from the URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/v1/fetch-subreddit?subredditName=${encodeURIComponent(page)}`);
          const data = await response.json();
          if (response.ok) {
            //setSuccess("Successfully created a post:."); // Set success message
            //setTimeout(() => setSuccess(""), 5000);  // Clear success message after 5 seconds
            setData(data); // Assuming the API returns an array of data
            console.log('Successfully fetched the content:', data);
          } else {
            setError(data.message || "Fail to create a post."); // Handle backend errors
            console.log(data.message)
            setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
          }
      } catch (err) {
        setError(error.message);
        console.error('Fail to create a post:', error);
        setTimeout(() => setError(""), 5000);  // Clear success message after 5 seconds
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // Re-fetch when the page changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1>{page}</h1>
      {data.map((item, index) => (
        <div key={index}>
        <Post
          subreddit={page}
          id={item.post_id}
          author={item.post_author}
          title={item.post_subject}
          content={item.post_content}
          upvotes={item.post_vote}
          comments={item.comment_count}
        />
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
