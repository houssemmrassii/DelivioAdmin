import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'; // New SignupPage component

import HomePage from './components/HomePage';
import '../src/assets/css/bootstrap-select.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <Sidebar />
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  {/* Add more routes here */}
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
