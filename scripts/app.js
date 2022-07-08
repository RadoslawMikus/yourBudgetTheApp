// ----------------------------
// DECLARATIONS
// ----------------------------
const setBudgetButton = document.querySelector(".save");
const addIncomeButton = document.querySelector(".income");
const addExpenseButton = document.querySelector(".expense");
const resetButton = document.querySelector(".reset");
const yourBudget = document.querySelector(".yourBudget");
const showIncomes = document.querySelector(".showIncomes");
const showExpenses = document.querySelector(".showExpenses");
const showAll = document.querySelector(".showAll");
const operationsDiv = document.querySelector(".operations table tbody");
const setBudgetInput = document.querySelector("#setBudget");
const currencySelect = document.querySelector("select");
const blockedElements = [setBudgetInput, setBudgetButton, currencySelect];

let money = 0;
let currency = currencySelect.value;

// ----------------------------
// RESETTING WHOLE APP
// ----------------------------
const resetApp = () => {
  const toReset = [setBudgetInput, date, amount, title];
  toReset.forEach((res) => (res.value = ""));
  operationsDiv.innerHTML = "";
  operations = [];
  money = 0;
  yourBudget.innerHTML = `<span class="title">yourBudget - the App!</span>`;
  blockedElements.forEach((rem) => rem.removeAttribute("disabled"));
};

resetButton.addEventListener("click", resetApp);

// ----------------------------
// SETTING BUDGET
// ----------------------------
const setBudget = () => {
  if (setBudgetInput.value !== "") {
    money += parseInt(setBudgetInput.value);
    yourBudget.textContent = money + currency;
    blockedElements.forEach((rem) => rem.setAttribute("disabled", "disabled"));
    filterArr(operations);
    return setBudgetInput.value;
  } else {
    alert("Please insert your primary budget");
  }
};

currencySelect.addEventListener(
  "change",
  () => (currency = currencySelect.value)
);

setBudgetButton.addEventListener("click", setBudget);

// ----------------------------
// ADDING INCOMES AND EXPENSES
// ----------------------------
const tableHeader = `<tr><th>Date</th><th>Title</th><th>Amount</th><th>Type</th></tr>`;

let operations = [];

const addOperation = (type) => {
  const date = document.querySelector("#date");
  const amount = document.querySelector("#amount");
  const title = document.querySelector("#title");

  if (date.value !== "" && (amount.value !== "") & (title.value !== "")) {
    operations = [
      ...operations,
      {
        date: date.value,
        amount: amount.value,
        title: title.value,
        type: type,
      },
    ];

    filterArr(operations);

    if (type === "expense") {
      money -= parseInt(amount.value);
    }
    if (type === "income") {
      money += parseInt(amount.value);
    }
    yourBudget.textContent = money + currency;
    date.value = "";
    amount.value = "";
    title.value = "";
  } else {
    alert("Please, input all the data (in the correct format)");
  }
};
addIncomeButton.addEventListener("click", () => addOperation("income"));
addExpenseButton.addEventListener("click", () => addOperation("expense"));

// ---------------------------------
// DISPLAYING INCOMES/EXPENSES/ALL
// ---------------------------------
let incomeExpense = {};
const filter = (type) => {
  incomeExpense[type] = operations.filter((operation) => {
    return operation.type === type;
  });
  return incomeExpense[type];
};

const filterArr = (arr) => {
  if (arr.length > 0) {
    operationsDiv.innerHTML = tableHeader;
  } else {
    operationsDiv.innerHTML = "";
  }
  for (let i = 0; i < arr.length; i++) {
    operationsDiv.innerHTML += `<tr><td>${arr[i].date}</td><td>${
      arr[i].title
    }</td><td>${arr[i].amount + currency}</td><td>${arr[i].type}</td></tr>`;
  }
};

showIncomes.addEventListener("click", () => filterArr(filter("income")));
showExpenses.addEventListener("click", () => filterArr(filter("expense")));
showAll.addEventListener("click", () => filterArr(operations));
