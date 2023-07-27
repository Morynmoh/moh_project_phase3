import React from 'react';
import bgImg from '../assets/joanna-kosinska-LAaSoL0LrYs-unsplash.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Applic.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  

const logUser = async () => {
  const response = await axios.post('http://localhost:9292/login', {
        user_name: userName,
        password: password,
      });
      console.log(response.data);
  }

  const handleLogin = () => {
    if (userName === '' || password === '') {
      alert('Please enter a username and password.');
      return;
    }

    logUser()
    navigate('/Home', { state: { userName: userName } });
      // navigate('/Home');
      
      
  };

  return (
    <section>
        <div className="register">
            <div className="col-1">
                <h2>Login</h2>
                
                <form id='form' className='flex flex-col' 
                onSubmit={handleLogin}
                >
                    <input 
                    type="text" 
                    placeholder='username' 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    />
                    <input 
                    type="password" 
                    placeholder='password' 
                    value={password}
                    required
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button className='btn'type="submit">Log In</button>
                    <h6>If you have not registered</h6>
                    <button className='btn' onClick={() => navigate('/')}>Go To Register</button>
                </form>

            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    </section>
  )
}
export default Login;
