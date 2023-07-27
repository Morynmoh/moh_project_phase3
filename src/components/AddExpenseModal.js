import { Form, Modal, Button } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";
import axios from "axios"; 

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
  }, []);


  function handleSubmit(e) {
    e.preventDefault();

    // Create a new FormData object and append the data to it
    const formData = new FormData();
    formData.append("description", descriptionRef.current.value);
    formData.append("amount", parseFloat(amountRef.current.value));
    formData.append("date", currentDate); 

    
    formData.append("budgetId", budgetIdRef.current.value);

    // Send the POST request using axios
    
    axios.post('http://localhost:9292/expenses', formData)
      .then((response) => {
        console.log('Response:', response.data);
        alert("Expense successfully updated");
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
        // Optionally, you can show an error message or handle the error
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          {/* New form field for the date */}
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={currentDate} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" style={{ backgroundColor: '#0E2954', color: '#fff' }}>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}








// import { Form, Modal, Button } from "react-bootstrap"
// import { useRef } from "react"
// import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"

// export default function AddExpenseModal({
//   show,
//   handleClose,
//   defaultBudgetId,
// }) {
//   const descriptionRef = useRef()
//   const amountRef = useRef()
//   const budgetIdRef = useRef()
//   const { addExpense, budgets } = useBudgets()

//   function handleSubmit(e) {
//     e.preventDefault()
//     addExpense({
//       description: descriptionRef.current.value,
//       amount: parseFloat(amountRef.current.value),
//       budgetId: budgetIdRef.current.value,
//     })
//     handleClose()
//   }

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Form onSubmit={handleSubmit}>
//         <Modal.Header closeButton>
//           <Modal.Title>New Expense</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3" controlId="description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control ref={descriptionRef} type="text" required />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="amount">
//             <Form.Label>Amount</Form.Label>
//             <Form.Control
//               ref={amountRef}
//               type="number"
//               required
//               min={0}
//               step={0.01}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="budgetId">
//             <Form.Label>Budget</Form.Label>
//             <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
//               <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
//               {budgets.map(budget => (
//                 <option key={budget.id} value={budget.id}>
//                   {budget.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//           <div className="d-flex justify-content-end">
//             <Button variant="primary" type="submit">
//               Add
//             </Button>
//           </div>
//         </Modal.Body>
//       </Form>
//     </Modal>
//   )
// }
