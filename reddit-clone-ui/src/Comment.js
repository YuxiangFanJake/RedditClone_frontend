import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faShare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Comment = ({ id, upvotes, content, author}) => {
  return (
    <div className="max-w-md mx-auto bg-grey rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className='"uppercase tracking-wide text-sm text-indigo-500 font-semibold"'>u/{author}</div>
          <div className='content'>{content}</div>
          <p className="mt-2 text-gray-500">{upvotes} points • 0 comments</p>
          <div className="mt-4 flex items-center">
            <button className="text-blue-500 hover:text-blue-600">
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button className="text-blue-500 hover:text-blue-600 ml-2">
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <button className="text-blue-500 hover:text-blue-600 ml-2">
                <FontAwesomeIcon icon={faShare} /> Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
