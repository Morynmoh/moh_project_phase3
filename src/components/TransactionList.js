import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './transaction.css';
import ExpenseUpdate from './ExpenseUpdate';

const TransactionList = () => {
  const [expenses, setExpenses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

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

  // Function to handle updating the expense in the parent component's state
  const handleUpdateExpense = (updatedExpense) => {
    // Handle the updated expense here, e.g., update the parent component's state
    console.log('Updated Expense:', updatedExpense);
    // Close the modal after successful update
    setShowUpdateModal(false);
  };

  return (
    <div>
      <h2>Transactions List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.description}</strong> - {expense.amount} - {expense.date}
            <Button variant="danger" onClick={() => handleDelete(expense.id)}>X</Button>
            {/* Open the modal for updating the expense */}
            
            <Button variant="primary" onClick={() => setShowUpdateModal(true)}>
  <FontAwesomeIcon icon={faRefresh} /></Button>
            {/* Render the ExpenseUpdate component within a modal if showUpdateModal is true */}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
