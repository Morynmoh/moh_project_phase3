import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ExpenseForm = ({ onAddExpense, show, onHide }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('http://localhost:9292/categories')
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
        console.log(category);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(selectedCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      description: description,
      date: date,
      amount: amount,
      category_id: selectedCategory,
      user_id: 1,
    };

    axios
      .post('http://localhost:9292/expenses', formData)
      .then((response) => {
        console.log('Response:', response.data);
        alert('Expense successfully updated');
        
        setDescription('');
        setAmount('');
        
        onHide();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Expense not added!!');
      });
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px', // Increase padding to create more space
    borderBottom: '1px solid #ccc',
    fontSize: '20px', // Increase font size
    backgroundColor: '#0E2954', // Background color
    color: '#fff', // Text color
    width: '100%', // Expand to full width
  };

  const selectStyle = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const optionStyle = {
    fontSize: '16px',
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date" style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount" style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div>
            <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleSelectChange}
              style={selectStyle}
            >
              {category &&
                category.map((cat) => (
                  <option key={cat.id} value={cat.id} style={optionStyle}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <Button type="submit" style={{ backgroundColor: '#0E2954', color: '#fff', marginTop: '16px' }}>
            Add Expense
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseForm;


// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios';
// import './expense.css';

// const ExpenseForm = ({ onAddExpense, show, onHide }) => {
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(0);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = () => {
//     axios
//       .get('http://localhost:9292/categories')
//       .then((response) => {
//         console.log(response.data);
//         setCategory(response.data);
//         console.log(category);
//       })
//       .catch((error) => {
//         console.error('Error fetching categories:', error);
//       });
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
//       user_id: 1,
//     };

//     axios
//       .post('http://localhost:9292/expenses', formData)
//       .then((response) => {
//         console.log('Response:', response.data);
//         alert('Expense successfully updated');
        
//         setDescription('');
//         setAmount('');
        
//         onHide();
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Expense not added!!');
//       });
//   };


//   const formatAmountWithCurrency = (value) => {
//     const formatter = new Intl.NumberFormat('en-KE', {
//       style: 'currency',
//       currency: 'KES',
//     });

//     return formatter.format(value);
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Expense</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="date">Date:</label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <input
//               type="text"
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="form-control"
//               required
//             />
//           </div>
//           <div>
//               <label>Category</label>
//               <select id="category" value={selectedCategory}
//               onChange={handleSelectChange}
//               >
//                 {category && category.map((cat)=>((
//                   <option key={cat.id} value={cat.id}>{cat.name}</option>

//                 )))}

//               </select>


//             </div>
//           {/* <p>{formatAmountWithCurrency(amount)}</p> */}
//           <Button type="submit" style={{ backgroundColor: '#0E2954', color: '#fff' }}>
//             Add Expense
//           </Button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ExpenseForm;


