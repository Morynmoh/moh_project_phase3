import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './transaction.css'

const TransactionList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses()
  }, [])
  const handleDelete = (id) => {
    
    axios.delete(`http://localhost:9292/expenses/${id}`)
      .then((response) => {
        console.log('Expense deleted successfully:', response.data);
        
        // fetchExpenses();
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => 
        expense.id !== id)) 
        
            
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
  };

  const fetchExpenses = () => {
    // Fetch the list of expenses from the server
    axios.get('http://localhost:9292/expenses')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  };

  useEffect(() => {
    // Fetch the initial list of expenses when the component mounts
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Transactions List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.description}</strong> - {expense.amount} - {expense.date}
            {/* Add the delete button with an onClick handler */}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
