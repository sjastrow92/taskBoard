// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
// const addTaskButton = $(".button-success");
// const modal = $(".modal");
// todo: create an onclick funciton to display modal

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (nextId === null) {
    nextId = 1;
  } else {
    nextId++;
  }

  localStorage.setItem("nextId", JSON.stringify(nextId));
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // TODO: Create a new card element and add the classes `card`, `project-card`, `draggable`, and `my-3`. Also add a `data-project-id` attribute and set it to the project id.
  let card = $("<div>")
    .addClass("card project-card draggable")
    .attr("data-task-id", task.id);
  // TODO: Create a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
  let cardHeader = $("<div>").addClass("card header h4").text(task.title);
  // TODO: Create a new card body element and add the class `card-body`.
  let cardBody = $("<div>").addClass("card-body");
  // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
  let cardParagraph = $("<div>").addClass("card-text").text(task.description);
  // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
  let cardDuedate = $("<div>")
    .addClass("card-text")
    //set up card background color based on the due date. Use dayJs to compare due date with today's date
    .text(task.dueDate);
  // TODO: Create a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-project-id` attribute and set it to the project id.
  let cardButton = $("<div>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id);

  //create card HTML elements $("<div>")
  card.append(cardHeader, cardBody, cardParagraph, cardDuedate, cardButton);
  return card;
  //return card
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $(function () {
    $(".draggable").draggable({ zIndex: 50 });
    //   $(".draggable").draggable();
  });

  $("#todo-cards").empty();
  $("#in-progress-cards").empty();
  $("#done-cards").empty();
  for (let index = 0; index < taskList.length; index++) {
    const task = taskList[index];
    const taskCard = createTaskCard(task);

    if (taskList[index].status == "to-do") {
      $("#todo-cards").append(taskCard);
    } else if (taskList[index].status == "in-progress") {
      $("#in-progress-cards").append(taskCard);
    } else {
      $("#done-cards").append(taskCard);
    }
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const task = {
    id: generateTaskId(),
    title: $("#task-title").val(),
    dueDate: $("#due-date").val(),
    description: $("#description").val(),
    status: "to-do",
  };

  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  renderTaskList();

  $("#task-title").val("");
  $("#due-date").val("");
  $("#description").val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(this).attr("#task");
  const tasks = renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  console.log(event, ui);

  const taskId = ui.draggable[0].dataset.taskId;

  const currentStatus = event.target.id;
  for (let i = 0; i < taskList.length; i++) {
    console.log(taskList[i].id);
    if (taskId == taskList[i].id) {
      console.log("hello");

      taskList[i].status = currentStatus;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $("#add-task-form").on("submit", handleAddTask);

  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});
