/**
 * @jest-environment jsdom
 */
import { JSDOM } from 'jsdom';
import { ExpenseManager, Expense } from '../Public/script.js';

// Simula el HTML mínimo necesario
const html = `
  <form id="expenseForm">
    <input id="description" value="Café" />
    <input id="amount" value="2.5" />
    <input id="category" value="Alimentación" />
    <input id="date" value="2025-06-16" />
    <input id="notes" value="Desayuno" />
    <button type="submit"></button>
  </form>
  <div id="expensesList"></div>
  <div id="totalAmount"></div>
  <div id="monthAmount"></div>
  <div id="topCategory"></div>
  <select id="categoryFilter"></select>
  <select id="monthFilter"></select>
`;

describe('ExpenseManager', () => {
  beforeAll(() => {
    const dom = new JSDOM(html, { url: "http://localhost" });
    (global as any).document = dom.window.document;
    (global as any).window = dom.window;
  });

  it('debe registrar un nuevo gasto', () => {
    const manager = new ExpenseManager();
    // Agrega el gasto directamente
    manager.addExpense({
      description: 'Café',
      amount: 2.5,
      category: 'Alimentación',
      date: '2025-06-16',
      notes: 'Desayuno'
    } as Expense);
    // Verifica que el gasto fue agregado
    expect(manager.expenses.length).toBeGreaterThan(0);
    expect(manager.expenses[0].description).toBe('Café');
    expect(manager.expenses[0].amount).toBe(2.5);
    expect(manager.expenses[0].category).toBe('Alimentación');
    expect(manager.expenses[0].notes).toBe('Desayuno');
  });
});