function getTodayKey() {
  const today = new Date().toISOString().split('T')[0];
  return "tasks_" + today;
}

function loadTasks() {
  return JSON.parse(localStorage.getItem(getTodayKey())) || [];
}

function saveTasks() {
  localStorage.setItem(getTodayKey(), JSON.stringify(tasks));
}

let tasks = loadTasks();

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("completed");
    }

    // Toggle complete
    li.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return;

  tasks.push({ text: text, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

renderTasks();
