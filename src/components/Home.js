import { Button, Stack } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import './home.css';
import ExpenseForm from "./ExpenseForm";
import AddCategory from "./AddCategory";
import TransactionList from "./TransactionList";
import React, { useEffect } from 'react';
import TotalExpense from './TotalExpense';

function Home() {
  const location = useLocation();
  const { userName } = location.state || {};

  const welcomeStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };
  const containerStyle = {
    backgroundColor: '#EEEDED',
    padding: '20px',
    display: 'inline-block', // Set display to flex
    flexWrap: 'wrap', // Allow flex items to wrap if needed
    justifyContent: 'space-between', // Space evenly between flex items
  };
  const columnStyle = {
    flex: '0 0 48%', // 48% width for each column
    marginBottom: '20px', // Add some spacing between columns
  };

  return (
    <>
      <div style={containerStyle}>
      <h1 style={welcomeStyle}>Welcome {userName}, to your Transaction Tracker!</h1>
        <div style={columnStyle}>
          
          <AddCategory />
        </div>
        <div style={columnStyle}>
          <ExpenseForm />
        </div>
        <div style={{ width: '100%' }}>
          <TransactionList />
        </div>
        <div style={{ width: '100%' }}>
          <TotalExpense />
        </div>
      </div>
    </>
  )
}

export default Home;
