import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Signin from './components/Signin';
import Login from './components/Login';
import bgImg from './assets/bckgrnd.png';


const App = () => {
  return (
    <>
    
    <div className="App" style={{ backgroundImage: `url(${bgImg})` }}>
      
      
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
    </div>
    </>
  );
};

export default App;
