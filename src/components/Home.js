import { Button, Stack } from "react-bootstrap"
import { useLocation } from 'react-router-dom';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
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
    backgroundColor: '#7895CB',
    padding: '20px',
  };
  return (
    <>
     
     <div style={containerStyle}>
    <h1 style={welcomeStyle}>Welcome {userName} Here</h1>
        <div>
        <h1>Category Form</h1>
        <AddCategory />
      </div>
      <div>
        <h1>Expense Form</h1>
        <ExpenseForm />
      </div>
      <div>
          <h1>Transaction List</h1>
          <TransactionList />
        </div>
        <div>
          <TotalExpense />
        </div>
    </div>
    </>
  )
}

export default Home