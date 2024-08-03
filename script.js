const income = document.getElementById("total-income");
const expense = document.getElementById("total-expense");
const outcome = document.getElementById("total-outcome");

const list = document.getElementById("finance-list");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const description = document.getElementById("Description").value.trim();
  const amountValue = document.getElementById("Amount").value;
  const amount = parseFloat(amountValue);
  const type = document.getElementById("type").value;

  if (description !== "" && !isNaN(amount) && amount > 0) {
    const entry = { description, amount, type };
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    updateFinanceList();
    updateTotal();

    document.getElementById("Description").value = "";
    document.getElementById("Amount").value = "";

  } else {
    alert("Please enter a valid description and a positive amount.");
  }
});

function updateFinanceList() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  list.innerHTML = ""; 
  
  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = entry.type;
    item.textContent = `${entry.description}: $${entry.amount.toFixed(2)}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttons";

    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editEntry(index);
    });

   
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      entries.splice(index, 1); 
      localStorage.setItem("entries", JSON.stringify(entries)); 
      updateFinanceList(); 
      updateTotal(); 
    });

    buttonContainer.appendChild(editButton); 
    buttonContainer.appendChild(deleteButton); 
    item.appendChild(buttonContainer); 
    list.appendChild(item);
  });
}


function editEntry(index) {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const entry = entries[index];

  document.getElementById("Description").value = entry.description;
  document.getElementById("Amount").value = entry.amount;
  document.getElementById("type").value = entry.type;

  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));

  updateFinanceList();
  updateTotal();
}

function updateTotal(){
  const entries = JSON.parse(localStorage.getItem("entries")) || [];

  let totalIncome = 0;
  let totalExpense = 0;
  

  entries.forEach((entry)=>{
    if(entry.type === "Income"){
      totalIncome += entry.amount;
    }else{
      totalExpense += entry.amount;
    }
  })

  let totalOutcome = totalIncome - totalExpense;

  income.innerHTML = `Total Income: $${totalIncome}`;
  expense.innerHTML = `Total Expense: $${totalExpense}`;
  outcome.innerHTML = `Total Outcome: $${totalOutcome}`;
}

updateFinanceList();
updateTotal();
