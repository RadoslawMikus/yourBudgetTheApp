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

let money = 0;

const resetApp = () => {
  setBudgetInput.value = "";
  date.value = "";
  amount.value = "";
  title.value = "";
  operationsDiv.innerHTML = "";
  money = 0;
  yourBudget.textContent = "";
  setBudgetInput.removeAttribute("disabled");
  setBudgetButton.removeAttribute("disabled");
};

resetButton.addEventListener("click", resetApp);

const setBudget = () => {
  if (setBudgetInput.value !== "") {
    money += parseInt(setBudgetInput.value);
    yourBudget.textContent = money;
    setBudgetInput.setAttribute("disabled", "disabled");
    setBudgetButton.setAttribute("disabled", "disabled");
    return setBudgetInput.value;
  } else {
    alert("Please insert your primary budget");
  }
};

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
    operationsDiv.innerHTML = "";
    for (let i = 0; i < operations.length; i++) {
      operationsDiv.innerHTML += `<tr><td>${operations[i].date}</td><td>${operations[i].title}</td><td>${operations[i].amount}</td><td>${operations[i].type}</td></tr>`;
    }

    if (type === "expense") {
      money -= parseInt(amount.value);
    }
    if (type === "income") {
      money += parseInt(amount.value);
    }
    yourBudget.textContent = money;
    date.value = "";
    amount.value = "";
    title.value = "";
  } else {
    alert("Please, input all the data");
  }
};

setBudgetButton.addEventListener("click", setBudget);
addIncomeButton.addEventListener("click", () => {
  addOperation("income");
});
addExpenseButton.addEventListener("click", () => {
  addOperation("expense");
});

const filterArr = (type) => {
  const filteredArray = operations.filter((oper) => {
    return oper.type === type;
  });

  operationsDiv.innerHTML = "";
  for (let i = 0; i < filteredArray.length; i++) {
    operationsDiv.innerHTML += `<tr><td>${filteredArray[i].date}</td><td>${filteredArray[i].title}</td><td>${filteredArray[i].amount}</td><td>${filteredArray[i].type}</td></tr>`;
  }
};

showExpenses.addEventListener("click", () => {
  filterArr("expense");
});

showIncomes.addEventListener("click", () => {
  filterArr("income");
});
showAll.addEventListener("click", () => {
  operationsDiv.innerHTML = "";
  for (let i = 0; i < operations.length; i++) {
    operationsDiv.innerHTML += `<tr><td>${operations[i].date}</td><td>${operations[i].title}</td><td>${operations[i].amount}</td><td>${operations[i].type}</td></tr>`;
  }
});
