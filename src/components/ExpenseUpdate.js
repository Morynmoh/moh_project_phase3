// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios';
// import './expense.css';

// const ExpenseUpdate = ({ expense, onUpdate }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [date, setDate] = useState(expense.date);
//   const [description, setDescription] = useState(expense.description);
//   const [amount, setAmount] = useState(expense.amount);
//   const [category, setCategory] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState(expense.category_id);

//   const handleUpdateExpense = () => {
//     setShowForm(true);
//   };

//   useEffect(() => {
//     fetchCategories()
//   }, []);

//   const fetchCategories = () => {
//     axios.get('http://localhost:9292/categories')
//       .then((response) => {
//         console.log(response.data);
//         setCategory(response.data);
//         console.log(category);
//       })
//       .catch((error) => {
//         console.error('Error fetching categories:', error);
//       });
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   const handleSelectChange = (e) => {
//     setSelectedCategory(e.target.value);
//     console.log(selectedCategory);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       description: description,
//       date: date,
//       amount: amount,
//       category_id: selectedCategory,
//       user_id: 1
//     };

//     axios.put(`http://localhost:9292/expenses/${expense.id}`, formData)
//       .then((response) => {
//         console.log('Response:', response.data);
//         alert('Expense successfully updated');
//         // Close the form after successful submission
//         setShowForm(false);
//         // Call the onUpdate function to update the expense in the parent component
//         onUpdate(response.data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert("Expense not updated!!");
//       });
//   };

//   return (
//     <>
//       <Button onClick={handleUpdateExpense}>Update Expense</Button>
//       <Modal show={showForm} onHide={handleCloseForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Expense</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleSubmit} className="expense-form">
//             <div className="form-group">
//               <label htmlFor="date">Date:</label>
//               <input
//                 type="date"
//                 id="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Description:</label>
//               <input
//                 type="text"
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="amount">Amount:</label>
//               <input
//                 type="number"
//                 id="amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//             <div>
//               <label>Category</label>
//               <select
//                 id="category"
//                 value={selectedCategory}
//                 onChange={handleSelectChange}
//               >
//                 {category && category.map((cat) => (
//                   <option key={cat.id} value={cat.id}>{cat.name}</option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Update Expense
//             </button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleCloseForm}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ExpenseUpdate;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './expense.css'; // Import the CSS file with styles for the component

const ExpenseUpdate = ({ expense, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  // Update the form fields when the selected expense changes
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


