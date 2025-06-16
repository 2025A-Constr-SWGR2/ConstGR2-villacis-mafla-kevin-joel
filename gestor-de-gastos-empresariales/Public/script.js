document.addEventListener('DOMContentLoaded', () => {
    const app = {
        expenses: [],

        initializeApp() {
            document
                .getElementById('expenseForm')
                .addEventListener('submit', this.handleFormSubmit.bind(this));

            this.loadExpensesFromBackend();
        },

        handleFormSubmit(event) {
            event.preventDefault();
            this.addExpense();
        },

        addExpense() {
            const expense = {
                description: document.getElementById('description').value,
                amount: parseFloat(document.getElementById('amount').value),
                category: document.getElementById('category').value,
                date: document.getElementById('date').value,
                notes: document.getElementById('notes').value
            };

            fetch('/gastos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expense)
            })
                .then(res => res.json())
                .then(() => {
                    this.loadExpensesFromBackend();
                    this.resetForm();
                    alert('✅ Gasto registrado exitosamente.');
                })
                .catch(err => {
                    console.error('Error al registrar gasto:', err);
                    alert('❌ Hubo un error al registrar el gasto.');
                });
        },

        loadExpensesFromBackend() {
            fetch('/gastos')
                .then(res => res.json())
                .then(data => {
                    this.expenses = data;
                    this.renderExpenses();
                })
                .catch(err => {
                    console.error('Error al cargar gastos:', err);
                });
        },

        renderExpenses() {
            const container = document.getElementById('expensesList');
            container.innerHTML = '';

            if (this.expenses.length === 0) {
                const empty = document.createElement('div');
                empty.className = 'no-expenses';
                empty.textContent = 'No hay gastos registrados. ¡Comienza agregando tu primer gasto!';
                container.appendChild(empty);
                return;
            }

            this.expenses.forEach(exp => {
                const item = document.createElement('div');
                item.className = 'expense-item';
                item.innerHTML = `
                    <strong>${exp.description}</strong> - $${exp.amount.toFixed(2)}<br>
                    <small><em>${exp.category}</em> - ${exp.date}</small>
                    ${exp.notes ? `<br><small>📝 ${exp.notes}</small>` : ''}
                `;
                container.appendChild(item);
            });
        },

        resetForm() {
            document.getElementById('expenseForm').reset();
        }
    };

    app.initializeApp();
});
