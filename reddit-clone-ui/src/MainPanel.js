import React, { useState } from 'react';
import Post from './Post.js'

const MainPanel = ()=>{
    const dummyPost = {
        subreddit: 'r/mildlyinfuriating',
        title: 'So Broke, should I just sell my organs ',
        upvotes: '15k',
        comments: '2.2k'
      };
      const dummyPost2 = {
        subreddit: 'r/mildlyinfuriating',
        title: 'Seriously, why?',
        imageSrc: 'programmer.png', // Replace with the path to your image
        upvotes: '15k',
        comments: '2.2k'
      };
    return(
        <div className="bg-gray-50 min-h-screen p-4">
        {/* Use Post component */}
        <Post
          subreddit="CMU"
          title="How to graduate without being insane"
          upvotes="333"
          comments="444"
        />
        <Post
          subreddit={dummyPost.subreddit}
          title={dummyPost.title}
          upvotes={dummyPost.upvotes}
          comments={dummyPost.comments}
        />
        <Post
          subreddit={dummyPost2.subreddit}
          title={dummyPost2.title}
          imageSrc={dummyPost2.imageSrc}
          upvotes={dummyPost2.upvotes}
          comments={dummyPost2.comments}
        />
        <Post
          subreddit={dummyPost.subreddit}
          title={dummyPost.title}
          upvotes={dummyPost.upvotes}
          comments={dummyPost.comments}
        /> 
        <Post
          subreddit={dummyPost2.subreddit}
          title={dummyPost2.title}
          imageSrc={dummyPost2.imageSrc}
          upvotes={dummyPost2.upvotes}
          comments={dummyPost2.comments}
        />
        <Post
          subreddit={dummyPost2.subreddit}
          title={dummyPost2.title}
          imageSrc={dummyPost2.imageSrc}
          upvotes={dummyPost2.upvotes}
          comments={dummyPost2.comments}
        />
      </div>
    );
};

export default MainPanel