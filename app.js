// ========== DOM ==========
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const toggleModalBtn = document.querySelector("#toggle-modal");

const taskTitle = document.querySelector("#task-title-input");
const taskDes = document.querySelector("#task-desc-input");
const addTaskBtn = document.querySelector("#add-new-task");

let dragElement = null;

// ========== MODAL ==========
toggleModalBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

// ========== ADD TASK ==========
addTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const desc = taskDes.value.trim();

  if (!title) return;

  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;

  task.innerHTML = `
    <h4>${title}</h4>
    <h5>${desc}</h5>
    <button class="deleteBtn">delete</button>
  `;

  todo.appendChild(task);

  saveData();
  updateCounts();

  taskTitle.value = "";
  taskDes.value = "";
  modal.classList.remove("active");
});

// ========== EVENT DELEGATION ==========
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    e.target.closest(".task").remove();
    saveData();
    updateCounts();
  }
});

document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("task")) {
    dragElement = e.target;
  }
});

// ========== COLUMN DRAG & DROP ==========
[todo, progress, done].forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", () => {
    if (dragElement) {
      column.appendChild(dragElement);
      dragElement = null;
      saveData();
      updateCounts();
    }
    column.classList.remove("hover-over");
  });
});

// ========== COUNT UPDATE ==========
function updateCounts() {
  todo.querySelector(".heading .right").innerText =
    todo.querySelectorAll(".task").length;

  progress.querySelector(".heading .right").innerText =
    progress.querySelectorAll(".task").length;

  done.querySelector(".heading .right").innerText =
    done.querySelectorAll(".task").length;
}

// ========== SAVE ==========
function saveData() {
  const data = {
    todo: todo.innerHTML,
    progress: progress.innerHTML,
    done: done.innerHTML,
  };

  localStorage.setItem("taskData", JSON.stringify(data));
}

// ========== LOAD ==========
function loadData() {
  const data = JSON.parse(localStorage.getItem("taskData"));
  if (!data) return;

  todo.innerHTML = data.todo;
  progress.innerHTML = data.progress;
  done.innerHTML = data.done;
}

// ========== INIT ==========
loadData();
updateCounts();
