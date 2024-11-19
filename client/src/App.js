import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App" >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
