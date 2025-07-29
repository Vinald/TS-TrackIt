"use strict";
const expenseType = document.getElementById("expense-type");
const expenseDescription = document.getElementById("desc");
const expenseAmount = document.getElementById("amount");
const addExpenseButton = document.querySelector(".add-expense-btn");
const creditDiv = document.querySelector(".expense-credit-item-container");
const debitDiv = document.querySelector(".expense-debit-item-container");
const totalAmountDiv = document.querySelector(".total-expense-amount");
let expenseItems = [];
let totalAmount = 0;
class Expense {
    constructor(type, description, amount) {
        this.id = 0;
        this.type = "debit";
        this.description = "";
        this.amount = 0;
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.id = Expense.currentId++;
    }
    getId() {
        return this.id;
    }
    getDescription() {
        return this.description;
    }
    getAmount() {
        return this.amount;
    }
}
Expense.currentId = 0;
const displayExpenseItems = () => {
    debitDiv.innerHTML = "";
    creditDiv.innerHTML = "";
    for (let item = 0; item < expenseItems.length; item++) {
        let expenseItem = expenseItems[item];
        let containerDiv = expenseItem.type === "credit" ? creditDiv : debitDiv;
        let cssClass = expenseItem.type === "credit" ? "credit-item" : "debit-item";
        let template = `
            <div class="${cssClass}">
                <div class="exp-desc">${expenseItem.getDescription()}</div>
                <div class="exp-amount">${expenseItem.getAmount()}</div>
                <div class="expense-delete">
                    <button class="delete-expense-button" onclick="{deleteExpense(${expenseItem.getId()})}">X</button>
                </div>
            </div>`;
        containerDiv === null || containerDiv === void 0 ? void 0 : containerDiv.insertAdjacentHTML("beforeend", template);
    }
};
const calculateTotalAmount = () => {
    return expenseItems.reduce((total, exp) => {
        let amount = exp.getAmount();
        if (exp.type === "debit") {
            amount = -exp.getAmount();
        }
        total += amount;
        return total;
    }, 0);
};
const displayTotal = () => {
    totalAmountDiv.textContent = `Balance:` + totalAmount.toString();
};
const deleteExpense = (id) => {
    expenseItems = expenseItems.filter(exp => exp.getId() !== id);
    displayExpenseItems();
    totalAmount = calculateTotalAmount();
    displayTotal();
};
addExpenseButton.addEventListener("click", (event) => {
    event.preventDefault();
    let type = expenseType.value === "credit" ? "credit" : "debit";
    const expense = new Expense(type, expenseDescription.value, expenseAmount.valueAsNumber);
    expenseItems.push(expense);
    displayExpenseItems();
    totalAmount = calculateTotalAmount();
    displayTotal();
});
