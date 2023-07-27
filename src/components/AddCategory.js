import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './expense.css';

const AddCategory = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const handleAddCategory = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const formData = {
    name
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post('http://localhost:9292/categories', formData)
      .then((response) => {
        console.log('Response:', response.data);
        alert('Category successfully added.');
        setName('');
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Category not added!!');
      });
  };

  return (
    <>
      <Button onClick={handleAddCategory} style={{ backgroundColor: '#0E2954' }}>
        Add Category
      </Button>
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group">
              <label htmlFor="description">Name:</label>
              <input
                type="text"
                id="description"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <Button type="submit" style={{ backgroundColor: '#0E2954', color: '#fff' }}>
              Add Category
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseForm} style={{ backgroundColor: '#0E2954', color: '#fff' }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCategory;
