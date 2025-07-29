"use strict";
const expenseType = document.getElementById("expense-type");
const expenseDescription = document.getElementById("desc");
const expenseAmount = document.getElementById("amount");
const addExpenseButton = document.querySelector(".add-expense-btn");
class Expense {
    constructor(type, description, amount) {
        this.id = 0;
        this.type = "credit";
        this.description = "";
        this.amount = 0;
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.id = Expense.curentId++;
    }
}
Expense.curentId = 0;
addExpenseButton.addEventListener("click", (event) => {
    event.preventDefault();
    const expense = new Expense("credit", "test", 100);
    console.log(expense);
});
