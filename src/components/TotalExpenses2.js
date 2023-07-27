
import React from 'react';

const TotalExpenses2 = ({ expenses }) => {
  // Calculate the total expense by summing up the amounts from all expenses
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="card" style={{ backgroundColor: '#0E2954', color: '#fff' }}>
      <div className="card-body">
        <h5 className="card-title">Total Expense</h5>
        <p className="card-text">${totalExpense.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TotalExpenses2;