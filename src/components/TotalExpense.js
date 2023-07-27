import React from 'react';
import { useBudgets } from '../contexts/BudgetsContext';

const TotalExpenseCard = () => {
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
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Expense</h5>
        <p className="card-text">${totalExpense.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TotalExpenseCard;
