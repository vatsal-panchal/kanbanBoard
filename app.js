// columns select
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

// currently dragged task reference
let dragElement = null;

// add drag event on each task
function addDragEvents(task) {
  task.addEventListener("drag", () => {
    dragElement = task;
  });
}

// enable drag & drop on columns
function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", () => {
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
    updateCounts();
    saveData();
  });
}

// apply drag logic on all columns
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// update task count in each column
function updateCounts() {
  [todo, progress, done].forEach((col) => {
    const count = col.querySelector(".right");
    if (count) count.textContent = col.querySelectorAll(".task").length;
  });
}

// save board data to localStorage
function saveData() {
  localStorage.setItem("todoData", todo.innerHTML);
  localStorage.setItem("progressData", progress.innerHTML);
  localStorage.setItem("doneData", done.innerHTML);
}

// load board data from localStorage
function loadData() {
  if (localStorage.getItem("todoData")) {
    todo.innerHTML = localStorage.getItem("todoData");
    progress.innerHTML = localStorage.getItem("progressData");
    done.innerHTML = localStorage.getItem("doneData");
  }
}

// modal elements
const togglemodalBtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskbBtn = document.querySelector("#add-new-task");

// open / close modal
togglemodalBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

// add new task
addTaskbBtn.addEventListener("click", () => {
  const titleInput = document.querySelector("#task-title-input");
  const descInput = document.querySelector("#task-desc-input");
  const taskTitle = titleInput.value.trim();
  const taskDesc = descInput.value.trim();

  if (taskTitle === "") {
    alert("Enter Task");
    return;
  }

  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", true);
  task.innerHTML = `<h4>${taskTitle}</h4><p>${taskDesc}</p><button class="delete-btn">delete</button>`;

  addDragEvents(task);
  todo.appendChild(task);
  updateCounts();
  saveData();

  titleInput.value = "";
  descInput.value = "";
  modal.classList.remove("active");
});

// delete task on button click
[todo, progress, done].forEach((col) => {
  col.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
      updateCounts();
      saveData();
    }
  });
});

// initial load from storage
loadData();
updateCounts();

// reattach drag events after reload
document.querySelectorAll(".task").forEach((task) => {
  addDragEvents(task);
});
