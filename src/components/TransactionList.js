import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ExpenseUpdate from './ExpenseUpdate';
import ExpenseForm from './ExpenseForm'; 

const TransactionList = () => {
  const [expenses, setExpenses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false); 

  useEffect(() => {
    fetchExpenses();
  }, [expenses]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9292/expenses/${id}`)
      .then((response) => {
        console.log('Expense deleted successfully:', response.data);
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
  };

  const fetchExpenses = () => {
    axios
      .get('http://localhost:9292/expenses')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  };

  
  const handleUpdateExpense = (updatedExpense) => {
    
    console.log('Updated Expense:', updatedExpense);
    
    setShowUpdateModal(false);
  };

  
  const handleAddExpense = (newExpense) => {
    axios
      .post('http://localhost:9292/expenses', newExpense)
      .then((response) => {
        console.log('Expense added successfully:', response.data);
        fetchExpenses(); 
        setShowAddExpenseModal(false); 
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });
  };

  const calculateTotalAmount = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const formatTotalAmount = (amount) => {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px', 
    borderBottom: '1px solid #ccc',
    
  };

  const listItemStyle1 = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px', 
    borderBottom: '1px solid #ccc',
    fontSize: '20px', 
    backgroundColor: '#0E2954', 
    color: '#fff', 
    width: '100%', 
  };


  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'underline' }}>Transactions List</h2>

      <Button onClick={() => setShowAddExpenseModal(true)} style={{ backgroundColor: '#0E2954', color: '#fff' }}>
        Add Expense
      </Button>

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {expenses.map((expense) => (
          <li key={expense.id} style={listItemStyle}>
            <span>{expense.date}</span>
            <span>{expense.description}</span>
            <span>{expense.amount}</span>

            <span>
              <Button onClick={() => handleDelete(expense.id)} style={{ backgroundColor: '#0E2954', color: '#fff' }}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
              <Button onClick={() => setShowUpdateModal(true)} style={{ backgroundColor: '#0E2954', color: '#fff' }}>
                <FontAwesomeIcon icon={faRefresh} />
              </Button>
              {showUpdateModal && (
                <Modal show={true} onHide={() => setShowUpdateModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Do you want to Update Record?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ExpenseUpdate expense={expense} onUpdate={handleUpdateExpense} />
                  </Modal.Body>
                </Modal>
              )}
            </span>
          </li>
        ))}
        
        <li style={listItemStyle1}>
          <span></span>
          <span><strong>Total:</strong></span>
          <span>KES <strong>{formatTotalAmount(calculateTotalAmount())}</strong></span>
          <span></span>
        </li>

      </ul>

      
      <ExpenseForm onAddExpense={handleAddExpense} show={showAddExpenseModal} onHide={() => setShowAddExpenseModal(false)} />
    </div>
  );
};

export default TransactionList;




