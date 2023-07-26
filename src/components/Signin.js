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

  const handleRegister = async () => {
    if (userName === '' || password === '') {
      alert('Please enter a username and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:9292/users', {
        user_name: userName,
        password: password,
      });
      // If the user is created successfully, you can handle the response here
      console.log(response.data);
      navigate('/Login');
    } catch (error) {
      // If there's an error, you can handle it here
      console.error(error);
    }
  };


  return (
    <section>
        <div className="register">
            <div className="col-1">
                <h2>Register User</h2>
                <span>register and enjoy the service</span>

                <form id='form' className='flex flex-col' >
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
        
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    
                    <button className='btn'onClick={handleRegister}>Register</button>
                    
                    <h6>If you already have an account, you can Login</h6>
                    <Link to='/LoginForm' className='btn' >Go To Login</Link>
                    {/* onClick={() => navigate('/Login')} */}
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