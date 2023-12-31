import { useLocation, useNavigate } from 'react-router-dom';
import ExpenseForm from "./ExpenseForm";
import AddCategory from "./AddCategory";
import TransactionList from "./TransactionList";
import React from 'react';


function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName } = location.state || {};

  const handleLogout = () => {
    navigate('/Login');
  };

  const welcomeStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };
  const containerStyle = {
    backgroundColor: '#EEEDED',
    padding: '20px',
    display: 'inline-block', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  };
  const columnStyle = {
    flex: '0 0 48%', 
    marginBottom: '20px', 
  };

  return (
    <>
      <div style={containerStyle}>
      <h1 style={welcomeStyle}>Welcome <span
      style={{ color: '#B31312', fontWeight: 'bold', fontSize: '24px', animation: 'fadeIn 2s', textTransform: 'capitalize' }}
      >{userName}</span>, to your Transaction Tracker!</h1>
      
        <div style={columnStyle}>
          
          <AddCategory />
        </div>
        <div style={columnStyle}>
          <ExpenseForm />
        </div>
        <div style={{ width: '100%' }}>
          <TransactionList />
        </div>
        <button onClick={handleLogout}>Logout</button>
      
      </div>
    </>
  )
}

export default Home;
