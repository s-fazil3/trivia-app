
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './components/Quiz';
import History from './pages/History';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
