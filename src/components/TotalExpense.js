
import { useBudgets } from '../contexts/BudgetsContext';

const TotalExpense = () => {
  const { budgets, getBudgetExpenses } = useBudgets();

  // Calculate the total expense by summing up the amounts from all budgets
  const totalExpense = budgets.reduce((total, budget) => {
    const budgetExpenses = getBudgetExpenses(budget.id);
    const budgetTotalExpense = budgetExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return total + budgetTotalExpense;
  }, 0);

  return (
    <div className="card" style={{ backgroundColor: '#0E2954', color: '#fff' }}>
      <div className="card-body">
        <h5 className="card-title">Total Expense</h5>
        <p className="card-text">${totalExpense.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TotalExpense;


// const TotalExpense = ({ expenses }) => {
//   // Calculate the total expense by summing up the amounts from all expenses
//   const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

//   return (
//     <div className="card" style={{ backgroundColor: '#0E2954', color: '#fff' }}>
//       <div className="card-body">
//         <h5 className="card-title">Total Expense</h5>
//         <p className="card-text">${totalExpense.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default TotalExpense;
