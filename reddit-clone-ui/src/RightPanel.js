import React from "react";

const RightPanel = () =>{
    return(
        <aside className="w-1/5 px-4">
        <div className="bg-white rounded shadow p-4 space-y-4">
          <div>
            <h3 className="font-bold">About Community</h3>
            <p>This is a great place to share comments and content.</p>
          </div>
          <div>
            <h3 className="font-bold">Advertisement</h3>
            <p>Space for ads or additional information.</p>
          </div>
        </div>
      </aside>
    );
};

export default RightPanel