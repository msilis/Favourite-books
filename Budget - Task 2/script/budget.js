//DOM element variables

let incomeCard = document.getElementById('income_card');
let expenseCard = document.getElementById('expense_card');
let actionCard = document.getElementById('action_card')
let disposableIncomeDisplay = document.getElementById('display_disposable_income')

//Buttons
let addIncomeButton = document.getElementById('add_income_button');
let addExpenseButton = document.getElementById('add_expense_button');
let addSavingsButton = document.getElementById('add_to_savings_button');

//Income Object

function createIncome(name, amount, recurring){
    this.name = name;
    this.amount = amount;
    this.recurring = recurring;
}

//Expense Object

function createExpense(name, amount, recurring){
    this.name = name;
    this.amount = amount;
    this.recurring = recurring;
}

//5 instances of income and expenses to load on initial page load

window.addEventListener('load', handleInitialPageLoad);

function handleInitialPageLoad(){
    if (JSON.parse(sessionStorage.getItem('income')) == null){
        //Income
        let income1 = new createIncome('Salary', 5000, true);
        let income2 = new createIncome('Project 1', 3000, false);
        let income3 = new createIncome('Consulting 1', 1000, false);
        let income4 = new createIncome('Consulting 2', 800, false);
        let income5 = new createIncome('Project 2', 900, false);
        let incomeList = [];
        incomeList.push(income1, income2, income3, income4, income5);
        sessionStorage.setItem('income', JSON.stringify(incomeList))

        //Expenses
        let expense1 = new createExpense('Rent', 1800, true);
        let expense2 = new createExpense('Groceries', 500, true);
        let expense3 = new createExpense('Mobile Phone', 20, true);
        let expense4 = new createExpense('Utilities', 300, true);
        let expense5 = new createExpense('Subscriptions', 60, true);
        let expenseList = [];
        expenseList.push(expense1, expense2, expense3, expense4, expense5);
        sessionStorage.setItem('expenses', JSON.stringify(expenseList));
        location.reload()
    }

}

//Display Income

function displayIncome(){
    let storedIncome = JSON.parse(sessionStorage.getItem('income'));
    let incomeContents = storedIncome.map(income => `<div class="income_list">Name: ${income.name} Amount: ${income.amount} Recurring? ${income.recurring}</div>`).join('\n')
    incomeCard.innerHTML = incomeContents;
}

//Display Expenses

function displayExpenses(){
    let storedExpenses = JSON.parse(sessionStorage.getItem('expenses'));
    let expenseContents = storedExpenses.map(expense => `<div class="expense_list">Name: ${expense.name} Amount: ${expense.amount} Recurring? ${expense.recurring}</div>`).join('\n');
    expenseCard.innerHTML = expenseContents;
}

//Function to add income

addIncomeButton.addEventListener('click', handleAddIncomeClick);

function handleAddIncomeClick(){
    let incomeName = prompt('What do you want this income to be called?');
    let incomeAmount = Number(prompt('How much is this income?'));
    let incomeRecurring = prompt('Is this income recurring? true/false');
    let storageIncome = JSON.parse(sessionStorage.getItem('income'))
    let setTrue = (incomeRecurring === 'true');

    let newIncome = new createIncome(incomeName, incomeAmount, setTrue);
    storageIncome.push(newIncome);
    sessionStorage.setItem('income', JSON.stringify(storageIncome));
    updateDisposableIncome();
    location.reload()
}

//Function to add expense

addExpenseButton.addEventListener('click', handleAddExpense);

function handleAddExpense(){
    let expenseName = prompt('What is the name of the expense?');
    let expenseAmount = Number(prompt('How much is this expense'));
    let expenseRecurring = prompt('Is this expense recurring? true/false');
    let storageExpenses = JSON.parse(sessionStorage.getItem('expenses'))
    let setTrue = (expenseRecurring === 'true');

    let newExpense = new createExpense(expenseName, expenseAmount, setTrue);
    storageExpenses.push(newExpense);
    sessionStorage.setItem('expenses', JSON.stringify(storageExpenses));
    updateDisposableIncome();
    location.reload();
}

//Function to add money to savings
addSavingsButton.addEventListener('click', handleAddSavings);

function handleAddSavings(){
    let savingsAmount = Number(prompt('How much to you want to put away for savings?'));
    sessionStorage.setItem('savings', savingsAmount);
    updateDisposableIncome();
}

//Display disposable income

//calculate total income
let incomeAmounts = [];
let incomeArray = JSON.parse(sessionStorage.getItem('income'));
for (let i=0; i<incomeArray.length; i++){
    incomeAmounts.push(incomeArray[i].amount);   
}
let totalIncome = incomeAmounts.reduce((acc, current) => acc + current, 0)

//calculate total expenses
let expenseAmounts = [];
let expenseArray = JSON.parse(sessionStorage.getItem('expenses'));
for (let i = 0; i<expenseArray.length; i++){
    expenseAmounts.push(expenseArray[i].amount)
}
let totalExpenses = expenseAmounts.reduce((acc, current) => acc + current, 0);

//function to display and update disposable income.

function updateDisposableIncome() {
    let storedSavings = JSON.parse(sessionStorage.getItem('savings'))
        disposableIncomeDisplay.innerHTML = `You have £${totalIncome - (totalExpenses + storedSavings)} left to spend this month.`;
 }

displayIncome(); 
displayExpenses();
updateDisposableIncome();
 