import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../assets/mediamodifier-I3HPUolh5hA-unsplash.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Applic.css';


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
    }

  const handleRegister = () => {
    if (userName === '' || password === '') {
      alert('Please enter a username and password.');
      return;
    }
  
    createUser() 
      navigate('/Login');
    
  };

  return (
    <section>
        <div className="register">
            <div className="col-1">
                <h2>Register User</h2>
                <span>register and enjoy the service</span>

                <form id='form' className='flex flex-col'onSubmit={handleRegister}>
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
                    minLength={8}
        
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    
                    <button className='btn' type="submit">Register</button>
                    
                    <h6>If you already have an account, you can Login</h6>
                    <Link to='/Login' className='btn'>Go To Login</Link>
                    
                    </form>

            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    </section>
  )
}

export default Signin;