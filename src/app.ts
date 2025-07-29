const expenseType = document.getElementById("expense-type")! as HTMLInputElement;
const expenseDescription = document.getElementById("desc")! as HTMLInputElement;
const expenseAmount = document.getElementById("amount")! as HTMLInputElement;
const addExpenseButton = document.querySelector(".add-expense-btn")! as HTMLButtonElement;

class Expense {
    static curentId: number = 0;
    id: number = 0;
    type: "credit" | "debit" = "credit";
    description: string = "";
    amount: number = 0;

    constructor(type: "credit" | "debit", description: string, amount: number) {
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.id = Expense.curentId++;
    }
}

addExpenseButton.addEventListener("click", (event) => {
    event.preventDefault();
    const expense = new Expense("credit", "test", 100);
    console.log(expense);
});
