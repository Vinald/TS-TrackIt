const expenseType = document.getElementById("expense-type")! as HTMLSelectElement;
const expenseDescription = document.getElementById("desc")! as HTMLInputElement;
const expenseAmount = document.getElementById("amount")! as HTMLInputElement;
const addExpenseButton = document.querySelector(".add-expense-btn")! as HTMLButtonElement;
const creditDiv = document.querySelector(".expense-credit-item-container")! as HTMLDivElement;
const debitDiv = document.querySelector(".expense-debit-item-container")! as HTMLDivElement;
const totalAmountDiv = document.querySelector(".total-expense-amount")! as HTMLDivElement;

let expenseItems: Expense[] = [];
let totalAmount = 0;

class Expense {
    private static currentId: number = 0;
    private readonly id: number = 0;
    type: "credit" | "debit" = "debit";
    description: string = "";
    amount: number = 0;

    constructor(type: "credit" | "debit", description: string, amount: number) {
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.id = Expense.currentId++;
    }

    getId(): number {
        return this.id;
    }
    getDescription(): string {
        return this.description;
    }
    getAmount(): number {
        return this.amount;
    }
}

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
                    <button class="delete-expense-button">X</button>
                </div>
            </div>`;
        containerDiv?.insertAdjacentHTML("beforeend", template);
    }
};

const calculateTotalAmount = () => {
    return expenseItems.reduce((total, exp) => {
        let amount = exp.amount;
        if (exp.type === "debit") {
            amount = -exp.amount;
        }
        total += amount;
        return total;
    }, 0);
};

const displayTotal = () => {
    totalAmountDiv.textContent = totalAmount.toString();
}

addExpenseButton.addEventListener("click", (event) => {
    event.preventDefault();

    let type: "credit" | "debit" = expenseType.value === "credit" ? "credit" : "debit";
    const expense = new Expense(type, expenseDescription.value, expenseAmount.valueAsNumber);
    expenseItems.push(expense);
    displayExpenseItems();
    
    totalAmount = calculateTotalAmount();
    displayTotal()
});
