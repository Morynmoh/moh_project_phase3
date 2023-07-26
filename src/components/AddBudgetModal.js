import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
  
    const formData = {
      name: JSON.stringify({
      })
    };
  
    // Send the POST request to the 'categories' endpoint using axios
    axios.post("http://localhost:9292/categories", formData)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Category successfully created");
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Category not created successfully")
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
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
// import { useBudgets } from "../contexts/BudgetsContext"

// export default function AddBudgetModal({ show, handleClose }) {
//   const nameRef = useRef()
//   const maxRef = useRef()
//   const { addBudget } = useBudgets()
//   function handleSubmit(e) {
//     e.preventDefault()
//     addBudget({
//       name: nameRef.current.value,
//       max: parseFloat(maxRef.current.value),
//     })
//     handleClose()
//   }

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Form onSubmit={handleSubmit}>
//         <Modal.Header closeButton>
//           <Modal.Title>New Budget</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3" controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control ref={nameRef} type="text" required />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="max">
//             <Form.Label>Maximum Spending</Form.Label>
//             <Form.Control
//               ref={maxRef}
//               type="number"
//               required
//               min={0}
//               step={0.01}
//             />
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
