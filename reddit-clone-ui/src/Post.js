import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faShare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Post = ({ subreddit, title, imageSrc, upvotes, comments }) => {
const isValidImageSrc = imageSrc;
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        {isValidImageSrc && (
            <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={imageSrc} alt="Post" />
        </div>
        )}
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{subreddit}</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</a>
          <p className="mt-2 text-gray-500">{upvotes} points • {comments} comments</p>
          <div className="mt-4 flex items-center">
            <button className="text-blue-500 hover:text-blue-600">
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button className="text-blue-500 hover:text-blue-600 ml-2">
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <button className="text-blue-500 hover:text-blue-600 ml-2">
                <FontAwesomeIcon icon={faShare} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
