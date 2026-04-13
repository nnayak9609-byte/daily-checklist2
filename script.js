let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("completed");
    }

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
  let text = input.value;

  if (text === "") return;

  tasks.push({ text: text, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

renderTasks();