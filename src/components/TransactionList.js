import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ExpenseUpdate from './ExpenseUpdate';
import ExpenseForm from './ExpenseForm'; // Import the ExpenseForm component

const TransactionList = () => {
  const [expenses, setExpenses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false); // State for showing the add expense modal

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

  // Function to handle adding a new expense to the list
  const handleAddExpense = (newExpense) => {
    axios
      .post('http://localhost:9292/expenses', newExpense)
      .then((response) => {
        console.log('Expense added successfully:', response.data);
        fetchExpenses(); // Fetch the updated list of expenses after adding
        setShowAddExpenseModal(false); // Close the modal after successful add
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    borderBottom: '1px solid #ccc',
  };

  const buttonStyle = {
    marginLeft: '8px',
    backgroundColor: '#0E2954',
    color: '#fff',
  };

  return (
    <div>
      <h2>Transactions List</h2>
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
      </ul>

      {/* Render the ExpenseForm component */}
      <ExpenseForm onAddExpense={handleAddExpense} show={showAddExpenseModal} onHide={() => setShowAddExpenseModal(false)} />
    </div>
  );
};

export default TransactionList;




