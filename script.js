const themeToggleBtn = document.getElementById('themeToggle');
const taskInput      = document.getElementById('taskInput');
const addTaskBtn     = document.getElementById('addTaskBtn');
const taskList       = document.getElementById('taskList');
const emptyState     = document.getElementById('emptyState');
const taskWarning    = document.getElementById('taskWarning');
const budgetTotalEl  = document.getElementById('budgetTotal');
const budgetExpenses = document.getElementById('budgetExpenses');
const calcBtn        = document.getElementById('calcBtn');
const budgetResult   = document.getElementById('budgetResult');
const balanceDisplay = document.getElementById('balanceDisplay');
const budgetWarning  = document.getElementById('budgetWarning');

let isDark = false;

themeToggleBtn.onclick = function() {
  if (isDark === false) {
    document.body.className = 'dark-mode';
    isDark = true;
  } else {
    document.body.className = '';
    isDark = false;
  }
};

let tasks  = [];
let nextId = 1;

function renderTasks() {
  if (tasks.length === 0) {
    emptyState.className = 'empty-state';
    taskList.innerHTML   = '';
    return;
  }

  emptyState.className = 'empty-state hidden';

  let html = '';

  for (let i = 0; i < tasks.length; i++) {
    let checkClass = 'task-check';
    let textClass  = 'task-text';
    let checkMark  = '';

    if (tasks[i].completed === true) {
      checkClass = 'task-check done';
      textClass  = 'task-text strikethrough';
      checkMark  = '✓';
    }

    html = html + '<li class="task-item">';
    html = html + '<button class="' + checkClass + '" onclick="toggleTask(' + tasks[i].id + ')">' + checkMark + '</button>';
    html = html + '<span class="' + textClass + '">' + tasks[i].text + '</span>';
    html = html + '<button class="task-delete" onclick="deleteTask(' + tasks[i].id + ')">✕</button>';
    html = html + '</li>';
  }

  taskList.innerHTML = html;
}

function addTask() {
  taskWarning.className = 'warning hidden';

  const text = taskInput.value;

  if (text === '') {
    taskWarning.className = 'warning';
    return;
  }

  tasks.push({ id: nextId, text: text, completed: false });
  nextId = nextId + 1;

  taskInput.value = '';
  renderTasks();
}

function toggleTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      if (tasks[i].completed === false) {
        tasks[i].completed = true;
      } else {
        tasks[i].completed = false;
      }
    }
  }
  renderTasks();
}

function deleteTask(id) {
  let updated = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      updated.push(tasks[i]);
    }
  }
  tasks = updated;
  renderTasks();
}

addTaskBtn.onclick = function() {
  addTask();
};

taskInput.onkeydown = function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
};

renderTasks();

function calculateBudget() {
  budgetWarning.className = 'warning hidden';

  const totalStr    = budgetTotalEl.value;
  const expensesStr = budgetExpenses.value;

  if (totalStr === '' || expensesStr === '') {
    budgetWarning.className = 'warning';
    return;
  }

  const total    = parseFloat(totalStr);
  const expenses = parseFloat(expensesStr);

  if (isNaN(total) || isNaN(expenses)) {
    budgetWarning.className = 'warning';
    return;
  }

  budgetWarning.className = 'warning hidden';

  const balance = total - expenses;
  budgetResult.className = 'budget-result';

  if (balance < 0) {
    balanceDisplay.textContent = '$' + balance.toFixed(2);
    balanceDisplay.className   = 'result-value negative';
  } else {
    balanceDisplay.textContent = '$' + balance.toFixed(2);
    balanceDisplay.className   = 'result-value';
  }
}

calcBtn.onclick = function() {
  calculateBudget();
};

budgetTotalEl.onkeydown = function(e) {
  if (e.key === 'Enter') {
    calculateBudget();
  }
};

budgetExpenses.onkeydown = function(e) {
  if (e.key === 'Enter') {
    calculateBudget();
  }
};
