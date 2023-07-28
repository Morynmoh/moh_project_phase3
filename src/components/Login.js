import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const logUser = async () => {
    const response = await axios.post('http://localhost:9292/login', {
      user_name: userName,
      password: password,
    });
    if (response.status === 404) {
      const error = await response.json();
      alert('Incorrect user_name or password.');
    } else {
      logUser();
      navigate('/Home', { state: { userName: userName } });
    }
  };

  const handleLogin = async () => {
    if (userName === '' || password === '') {
      alert('Please enter a username and password.');
      return;
    }

    try {
      await logUser();
    } catch (error) {
      alert('Incorrect user_name or password.');
    }
  };

  const buttonStyle = {
    margin: '10px 0',
    padding: '8px 16px',
    border: '2px solid #0E2954',
    backgroundColor: '#0E2954',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  };

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '400px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Login</h2>
        <form id='form' className='flex flex-col' onSubmit={handleLogin} >
          <input
            type="text"
            placeholder='username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ margin: '10px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            placeholder='password'
            value={password}
            required
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '10px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
          
          <button className='btn' type="submit" style={buttonStyle}>Log In</button>
          <h6 style={{ marginTop: '10px' }}>If you have not registered</h6>
          <button className='btn' onClick={() => navigate('/')} style={buttonStyle}>Go To Register</button>
        </form>
      </div>
    </section>
  )
};

export default Login;




