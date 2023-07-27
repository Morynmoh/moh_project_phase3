import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './expense.css';

const ExpenseForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)

  const handleAddExpense = () => {
    setShowForm(true);
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    
    axios.get('http://localhost:9292/categories')
      .then((response) => {
        console.log(response.data);
        setCategory(response.data)
        console.log(category)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value)
    console.log(selectedCategory)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      description: description,
      date: date,
      amount: amount,
      category_id: selectedCategory,
      user_id: 1
    };

    axios.post('http://localhost:9292/expenses', formData)
      .then((response) => {
        console.log('Response:', response.data);
        alert('Expense successfully updated');
        // Clear the form fields after successful update
        setDescription('');
        setAmount('');
        // Close the form after successful submission
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Expense not added!!")
      });
  };

  return (
    <>
      <Button onClick={handleAddExpense} style={{ backgroundColor: '#0E2954', color: '#fff' }}>Add Expense</Button>
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="expense-form">
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
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label>Category</label>
              <select id="category" value={selectedCategory}
              onChange={handleSelectChange}
              >
                {category && category.map((cat)=>((
                  <option key={cat.id} value={cat.id}>{cat.name}</option>

                )))}
                
              </select>
              

            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0E2954' }}>
              Add Expense
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseForm} style={{ backgroundColor: '#0E2954' }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpenseForm;





// import React, { useState } from 'react';
// import axios from 'axios';

// const ExpenseForm = () => {
  
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       description,
//       date,
//       amount,
//     };

//     axios.post('http://localhost:9292/expenses', formData)
//       .then((response) => {
//         console.log('Response:', response.data);
//         alert("Expense successfully updated")
//         // Clear the form fields after successful update
//         setDescription('');
//         setAmount('');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         // Optionally, you can show an error message or handle the error
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <input
//           type="text"
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="date">Date:</label>
//         <input
//           type="date"
//           id="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="amount">Amount:</label>
//         <input
//           type="number"
//           id="amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ExpenseForm;
