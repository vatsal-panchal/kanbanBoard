// const todo = document.querySelector("#todo");
// const progress = document.querySelector("#progress");
// const done = document.querySelector("#done");
// const tasks = document.querySelectorAll(".task");
// let dragElement = null;
// tasks.forEach((task) => {
//   task.addEventListener("drag", (e) => {
//     dragElement = task;
//   });
// });

// function addDragEventsOnColumn(column) {
//   column.addEventListener("dragenter", (e) => {
//     e.preventDefault();
//     column.classList.add("hover-over");
//   });

//   column.addEventListener("dragleave", (e) => {
//     e.preventDefault();
//     column.classList.remove("hover-over");
//   });

//   // iss code se browser allow karta he ki aap task add kar sakte ho
//   column.addEventListener("dragover", (e) => {
//     e.preventDefault();
//   });

//   column.addEventListener("drop", (ok) => {
//     ok.preventDefault();

//     column.appendChild(dragElement);
//     column.classList.remove("hover-over");
//   });
// }

// addDragEventsOnColumn(todo);
// addDragEventsOnColumn(progress);
// addDragEventsOnColumn(done);



