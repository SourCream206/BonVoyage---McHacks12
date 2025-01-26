import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInput from './components/UserInput.jsx';
import NewPage from './components/NewPage.jsx'; 
import Page3 from "./components/page3.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route path="/new-page" element={<NewPage />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </Router>
  );
};

export default App;
