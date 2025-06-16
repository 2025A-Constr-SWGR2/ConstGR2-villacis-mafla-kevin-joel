class ExpenseManager {
    constructor() {
        this.expenses = this.loadExpenses();
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.setTodayDate();
        this.populateMonthFilter();
        this.renderExpenses();
        this.updateSummary();
    }

    setupEventListeners() {
        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.renderExpenses();
        });

        document.getElementById('monthFilter').addEventListener('change', () => {
            this.renderExpenses();
        });
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    addExpense() {
        const expense = {
            id: Date.now(),
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            category: document.getElementById('category').value,
            date: document.getElementById('date').value,
            notes: document.getElementById('notes').value,
            timestamp: new Date().toISOString()
        };

        this.expenses.unshift(expense);
        this.saveExpenses();
        this.renderExpenses();
        this.updateSummary();
        this.resetForm();
        this.showNotification('Gasto registrado exitosamente', 'success');
    }

    deleteExpense(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
            this.expenses = this.expenses.filter(expense => expense.id !== id);
            this.saveExpenses();
            this.renderExpenses();
            this.updateSummary();
            this.showNotification('Gasto eliminado', 'error');
        }
    }

    renderExpenses() {
        const expensesList = document.getElementById('expensesList');
        const categoryFilter = document.getElementById('categoryFilter').value;
        const monthFilter = document.getElementById('monthFilter').value;

        let filteredExpenses = this.expenses;

        if (categoryFilter) {
            filteredExpenses = filteredExpenses.filter(expense => 
                expense.category === categoryFilter
            );
        }

        if (monthFilter) {
            filteredExpenses = filteredExpenses.filter(expense => 
                expense.date.startsWith(monthFilter)
            );
        }

        if (filteredExpenses.length === 0) {
            expensesList.innerHTML = '<div class="no-expenses">No se encontraron gastos con los filtros aplicados.</div>';
            return;
        }

        expensesList.innerHTML = filteredExpenses.map(expense => `
            <div class="expense-item">
                <div class="expense-details">
                    <div class="expense-description">${expense.description}</div>
                    <div class="expense-date">${this.formatDate(expense.date)}</div>
                    ${expense.notes ? `<small style="color: #7f8c8d; font-style: italic;">${expense.notes}</small>` : ''}
                </div>
                <div class="expense-category">${expense.category}</div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                <button class="delete-btn" onclick="expenseManager.deleteExpense(${expense.id})">
                    🗑️
                </button>
            </div>
        `).join('');
    }

    updateSummary() {
        const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;

        // Gastos del mes actual
        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthExpenses = this.expenses.filter(expense => 
            expense.date.startsWith(currentMonth)
        );
        const monthTotal = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        document.getElementById('monthAmount').textContent = `$${monthTotal.toFixed(2)}`;

        // Categoría más utilizada
        const categoryTotals = {};
        this.expenses.forEach(expense => {
            categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
        });

        const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
            categoryTotals[a] > categoryTotals[b] ? a : b, 'N/A'
        );
        document.getElementById('topCategory').textContent = topCategory;
    }

    populateMonthFilter() {
        const monthFilter = document.getElementById('monthFilter');
        const months = [...new Set(this.expenses.map(expense => expense.date.slice(0, 7)))].sort().reverse();
        
        months.forEach(month => {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = this.formatMonth(month);
            monthFilter.appendChild(option);
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatMonth(monthString) {
        const [year, month] = monthString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long'
        });
    }

    resetForm() {
        document.getElementById('expenseForm').reset();
        this.setTodayDate();
    }

    saveExpenses() {
        // En un entorno real, esto se guardaría en una base de datos
        // Por ahora usamos localStorage para persistencia
        try {
            localStorage.setItem('expenses', JSON.stringify(this.expenses));
        } catch (error) {
            console.log('LocalStorage no disponible, usando memoria temporal');
        }
    }

    loadExpenses() {
        // Intentar cargar desde localStorage
        try {
            const savedExpenses = localStorage.getItem('expenses');
            if (savedExpenses) {
                return JSON.parse(savedExpenses);
            }
        } catch (error) {
            console.log('Error al cargar desde localStorage');
        }

        // Datos de ejemplo para demostración
        return [
            {
                id: 1,
                description: "Compra de laptops para el equipo",
                amount: 2500.00,
                category: "Tecnología",
                date: "2025-06-01",
                notes: "Dell Inspiron 15 - 2 unidades",
                timestamp: "2025-06-01T10:00:00.000Z"
            },
            {
                id: 2,
                description: "Almuerzo de trabajo con cliente",
                amount: 85.50,
                category: "Alimentación",
                date: "2025-06-05",
                notes: "Restaurante El Dorado - 4 personas",
                timestamp: "2025-06-05T14:30:00.000Z"
            },
            {
                id: 3,
                description: "Campaña publicitaria en redes sociales",
                amount: 450.00,
                category: "Marketing",
                date: "2025-06-07",
                notes: "Facebook e Instagram Ads - 1 mes",
                timestamp: "2025-06-07T09:15:00.000Z"
            }
        ];
    }

    showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Método para limpiar todos los gastos
    clearAllExpenses() {
        if (confirm('¿Estás seguro de que deseas eliminar todos los gastos? Esta acción no se puede deshacer.')) {
            this.expenses = [];
            this.saveExpenses();
            this.renderExpenses();
            this.updateSummary();
            this.populateMonthFilter();
            this.showNotification('Todos los gastos han sido eliminados', 'error');
        }
    }

    // Método para exportar datos (funcionalidad adicional)
    exportToJSON() {
        const dataStr = JSON.stringify(this.expenses, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `gastos_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Método para obtener estadísticas por categoría
    getCategoryStats() {
        const categoryStats = {};
        this.expenses.forEach(expense => {
            if (!categoryStats[expense.category]) {
                categoryStats[expense.category] = {
                    total: 0,
                    count: 0,
                    average: 0
                };
            }
            categoryStats[expense.category].total += expense.amount;
            categoryStats[expense.category].count += 1;
        });

        // Calcular promedio
        Object.keys(categoryStats).forEach(category => {
            categoryStats[category].average = 
                categoryStats[category].total / categoryStats[category].count;
        });

        return categoryStats;
    }
}

// Función global para limpiar gastos (llamada desde HTML)
function clearAllExpenses() {
    expenseManager.clearAllExpenses();
}

// Función global para exportar datos
function exportExpenses() {
    expenseManager.exportToJSON();
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el administrador de gastos
    window.expenseManager = new ExpenseManager();
    
    console.log('Sistema de Control de Gastos inicializado correctamente');
    
    // Funcionalidades adicionales que se pueden activar
    console.log('Funcionalidades disponibles:');
    console.log('- expenseManager.exportToJSON() - Exportar datos');
    console.log('- expenseManager.getCategoryStats() - Estadísticas por categoría');
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Funciones de utilidad adicionales
const Utils = {
    // Formatear moneda
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    },

    // Validar email (para futuras funcionalidades)
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Generar ID único
    generateId: () => {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    // Debounce para optimizar búsquedas
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Exportar para uso global
window.Utils = Utils;
export { ExpenseManager };