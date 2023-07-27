import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './expense.css'; 

const ExpenseUpdate = ({ expense, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setDescription(expense.description);
    setDate(expense.date);
    setAmount(expense.amount);
  }, [expense]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedExpense = {
      id: expense.id,
      description,
      date,
      amount,
      category_id: expense.category_id,
      user_id: expense.user_id,
    };

    axios
      .patch(`http://localhost:9292/expenses/${expense.id}`, updatedExpense)
      .then((response) => {
        console.log('Expense updated successfully:', response.data);
        onUpdate(response.data); 
        handleCloseModal(); 
      })
      .catch((error) => {
        console.error('Error updating expense:', error);
      });
  };

  return (
    <div>
      <Button onClick={handleShowModal} className="update-button">
        Update
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0E2954', color: '#fff' }}>
              Update Expense
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} style={{ backgroundColor: '#0E2954', color: '#fff' }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExpenseUpdate;


