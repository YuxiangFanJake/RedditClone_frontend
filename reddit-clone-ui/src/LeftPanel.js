import React from "react";

const LeftPanel = ()=> {
    return(    
        <aside className="w-1/5 px-4">
        <div className="bg-white rounded shadow p-4 space-y-4">
        <button className="w-full p-3 bg-gray-300 rounded text-left font-bold">Home</button>
        <button className="w-full p-3 bg-white rounded text-left">Popular</button>
        <button className="w-full p-3 bg-white rounded text-left">All</button>
        {/* Subreddit list */}
        <h3 className="font-bold">Subreddits</h3>
        <ul>
            <li className="py-1"><a href="#r/javascript" className="text-blue-500">r/javascript</a></li>
            <li className="py-1"><a href="#r/reactjs" className="text-blue-500">r/reactjs</a></li>
            <li className="py-1"><a href="#r/webdev" className="text-blue-500">r/webdev</a></li>
        </ul>
        </div>
    </aside>
  );
};

export default LeftPanel;