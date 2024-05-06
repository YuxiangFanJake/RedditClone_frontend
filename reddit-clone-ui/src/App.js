import React from 'react';
import './tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPanel from './TopPanel';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import MainPanel from './MainPanel';
import ComposePanel from './ComposePanel'; 
import NewCommunityForm from './NewCommunityForm'; 

const App = () => {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <TopPanel />
        <div className="container mx-auto flex mt-4">
          <LeftPanel />
          <Routes> {/* Replacing Switch with Routes */}
            <Route path="/" element={<MainPanel />} />
            <Route path="/compose" element={<ComposePanel />} />
            <Route path="/new-community" element={<NewCommunityForm/>} />
          </Routes>
          <RightPanel />
        </div>
      </div>
    </Router>
  );
};

export default App;
