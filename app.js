const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement = null;

/* update task count */
function updateCounts() {
  [todo, progress, done].forEach((col) => {
    const count = col.querySelector(".right");
    count.textContent = col.querySelectorAll(".task").length;
  });
}

/* save HTML to localStorage */
function saveData() {
  localStorage.setItem("todoData", todo.innerHTML);
  localStorage.setItem("progressData", progress.innerHTML);
  localStorage.setItem("doneData", done.innerHTML);
}

/* load HTML from localStorage */
function loadData() {
  if (localStorage.getItem("todoData") !== null) {
    todo.innerHTML = localStorage.getItem("todoData");
    progress.innerHTML = localStorage.getItem("progressData");
    done.innerHTML = localStorage.getItem("doneData");
  }
}

/* drag start */
function addDragEvents(task) {
  task.addEventListener("dragstart", () => {
    dragElement = task;
  });
}

/* enable drop on column */
function enableColumnDrag(column) {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    updateCounts();
    saveData();
  });
}

/* setup drag on columns */
enableColumnDrag(todo);
enableColumnDrag(progress);
enableColumnDrag(done);

/* modal controls */
const togglemodalBtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskbBtn = document.querySelector("#add-new-task");

togglemodalBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

/* add new task */
addTaskbBtn.addEventListener("click", () => {
  const titleInput = document.querySelector("#task-title-input");
  const descInput = document.querySelector("#task-desc-input");

  const taskTitle = titleInput.value;
  const taskDesc = descInput.value;

  if (taskTitle.trim() !== "") {
    const task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("draggable", true);

    task.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDesc}</p>
      <button class="delete-btn">delete</button>
    `;

    addDragEvents(task);

    todo.append(task);
    updateCounts();
    saveData();

    titleInput.value = "";
    descInput.value = "";

    modal.classList.remove("active");
  } else {
    alert("Enter Task");
  }
});

/* delete task */
[todo, progress, done].forEach((col) => {
  col.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
      updateCounts();
      saveData();
    }
  });
});

/* initial load */
loadData();
updateCounts();

/* re-attach drag */
document.querySelectorAll(".task").forEach((task) => {
  addDragEvents(task);
});
