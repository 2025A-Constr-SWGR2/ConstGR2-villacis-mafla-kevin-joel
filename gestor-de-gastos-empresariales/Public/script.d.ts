export interface Expense {
  description: string;
  amount: number;
  category: string;
  date: string;
  notes: string;
  id?: string;
}

export class ExpenseManager {
  expenses: Expense[];
  constructor();
  addExpense(expense: Expense): void;
  deleteExpense(id: string): void;
  renderExpenses(): void;
  updateSummary(): void;
  populateMonthFilter(): void;
  formatDate(dateString: string): string;
  formatMonth(monthString: string): string;
  resetForm(): void;
  saveExpenses(): void;
  loadExpenses(): Expense[];
  showNotification(message: string, type: string): void;
  clearAllExpenses(): void;
  exportToJSON(): void;
  getCategoryStats(): any;
}