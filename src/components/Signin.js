import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../assets/mediamodifier-I3HPUolh5hA-unsplash.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createUser = async () => {
    const response = await axios.post('http://localhost:9292/register', {
      user_name: userName,
      password: password,
    });
    console.log(response.data);
  };

  const handleRegister = () => {
    if (userName === '' || password === '') {
      alert('Please enter a username and password.');
      return;
    }

    createUser();
    navigate('/Login');
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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Register User</h2>
        <span>register and enjoy the service</span>
        <form id='form' className='flex flex-col' onSubmit={handleRegister}>
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
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }}
        />
        <button className='btn' type="submit" style={buttonStyle}>Register</button>
        <h6 style={{ marginTop: '10px' }}>If you already have an account, you can Login</h6>
        <Link to='/Login' className='btn' style={buttonStyle}>Go To Login</Link>
      </form>
      </div>
    </section>
  )
}

export default Signin;
