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

let money = 0;
let currency = currencySelect.value;

const resetApp = () => {
  setBudgetInput.value = "";
  date.value = "";
  amount.value = "";
  title.value = "";
  operationsDiv.innerHTML = "";
  money = 0;
  yourBudget.innerHTML = `<span class="title">yourBudget - the App!</span>`;
  setBudgetInput.removeAttribute("disabled");
  setBudgetButton.removeAttribute("disabled");
  currencySelect.removeAttribute("disabled");
};

resetButton.addEventListener("click", resetApp);

const setBudget = () => {
  if (setBudgetInput.value !== "") {
    money += parseInt(setBudgetInput.value);
    yourBudget.textContent = money + currency;
    setBudgetInput.setAttribute("disabled", "disabled");
    setBudgetButton.setAttribute("disabled", "disabled");
    currencySelect.setAttribute("disabled", "disabled");
    return setBudgetInput.value;
  } else {
    alert("Please insert your primary budget");
  }
};

let operations = [
  {
    date: "2022-01-24",
    amount: "321325",
    title: "dasdsad sd sad asd aseqwerfds ad a",
    type: "income",
  },
  {
    date: "2022-01-24",
    amount: "433243123",
    title: "vcxooi odif oirewnk ",
    type: "expense",
  },
  {
    date: "2022-01-24",
    amount: "321325",
    title: "dasdsad sd sad asd aseqwerfds ad a",
    type: "income",
  },
];

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
    operationsDiv.innerHTML = `<tr>
    <th>Date</th>
    <th>Title</th>
    <th>Amount</th>
    <th>Type</th>
  </tr>`;
    for (let i = 0; i < operations.length; i++) {
      operationsDiv.innerHTML += `<tr><td>${operations[i].date}</td><td>${
        operations[i].title
      }</td><td>${operations[i].amount + currency}</td><td>${
        operations[i].type
      }</td></tr>`;
    }

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

  operationsDiv.innerHTML = `              <tr>
  <th>Date</th>
  <th>Title</th>
  <th>Amount</th>
  <th>Type</th>
</tr>`;
  for (let i = 0; i < filteredArray.length; i++) {
    operationsDiv.innerHTML += `<tr><td>${filteredArray[i].date}</td><td>${
      filteredArray[i].title
    }</td><td>${filteredArray[i].amount + currency}</td><td>${
      filteredArray[i].type
    }</td></tr>`;
  }
};

showExpenses.addEventListener("click", () => {
  filterArr("expense");
});

showIncomes.addEventListener("click", () => {
  filterArr("income");
});
showAll.addEventListener("click", () => {
  operationsDiv.innerHTML = `              <tr>
  <th>Date</th>
  <th>Title</th>
  <th>Amount</th>
  <th>Type</th>
</tr>`;
  for (let i = 0; i < operations.length; i++) {
    operationsDiv.innerHTML += `<tr><td>${operations[i].date}</td><td>${
      operations[i].title
    }</td><td>${operations[i].amount + currency}</td><td>${
      operations[i].type
    }</td></tr>`;
  }
});

currencySelect.addEventListener("change", () => {
  currency = currencySelect.value;
});
