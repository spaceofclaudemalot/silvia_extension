const body = document.body[0];

const importanceLevelsOptions = [
  { value: 5, label: "⭐⭐⭐⭐⭐", info: "Urgence n1" },
  { value: 4, label: "⭐⭐⭐⭐", info: "haute" },
  { value: 3, label: "⭐⭐⭐", info: "normale" },
  { value: 2, label: "⭐⭐", info: "faible" },
  { value: 1, label: "⭐", info: "très faible" },
];
const progressStatusOptions = [
  { value: "missing", label: "Information manquante" },
  { value: "todo", label: "À faire" },
  { value: "doing", label: "En cours" },
  { value: "reviewing", label: "En révision" },
  { value: "done", label: "Terminé" },
  { value: "blocked", label: "Bloqué" },
  { value: "archived", label: "Archivé" },
  { value: "cancelled", label: "Annulé" },
];

function createElement(tag, id, className, parent) {
  const element = document.createElement(tag);
  element.id = id;
  element.className = className;
  parent.appendChild(element);
  return element;
}

// Create the app container
const appContainer = createElement("div", "appContainer", "", document.body);

// Create the greetings container and element
const greetingsContainer = createElement(
  "div",
  "greetingsContainer",
  "",
  appContainer
);
const greetings = createElement("h1", "greetings", "", greetingsContainer);
greetings.textContent = `Hey, `;

// Create the tasks to do container
const tasksToDoContainer = createElement(
  "div",
  "tasksToDoContainer",
  "",
  appContainer
);
const tasksToDoList = createElement(
  "ul",
  "allTasksList",
  "",
  tasksToDoContainer
);

// Create the all tasks container
const allTasksContainer = createElement(
  "div",
  "allTasksContainer",
  "",
  appContainer
);
const allTasksList = createElement("ul", "allTasksList", "", allTasksContainer);
const form = createElement("form", "form", "", allTasksContainer);
const newTask = createElement("input", "newTask", "", form);
newTask.type = "text";
newTask.placeholder = "+ Ajoute une tâche";
newTask.minLength = 2;
newTask.focus();
newTask.required = true;

// Create the notes container
const notesContainer = createElement("div", "notesContainer", "", appContainer);
const notesArea = createElement("textarea", "notesArea", "", notesContainer);
notesArea.placeholder = "Ajoute tes notes rapides ici ";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskItem = createElement("li", "", "item", allTasksList);

  // Create a span for the task text
  const taskText = createElement("span", "", "task-name", taskItem);
  taskText.textContent = newTask.value;

  // Create a select element for importance levels
  const importanceLevel = createElement(
    "select",
    "",
    "task-importance",
    taskItem
  );
  const options = importanceLevelsOptions;
  options.forEach((option) => {
    const optionElement = createElement(
      "option",
      "",
      "task-importance",
      importanceLevel
    );
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    optionElement.selected = option.value === 3; // Set level 3as default
  });

  // Create a date input for the task
  const dueDate = createElement("input", "", "task-date", taskItem);
  dueDate.type = "date";
  dueDate.value = new Date().toISOString().split("T")[0]; // Set today's date as default

  // Create a delete button for the task
  const deleteButton = createElement("button", "", "delete-button", taskItem);
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", (e) => {
    taskItem.remove();
  });

  // Create a select element for task status
  const statusSelect = createElement("select", "", "task-status", taskItem);
  const statusOptions = progressStatusOptions;
  statusOptions.forEach((option) => {
    const optionElement = createElement("option", "", "", statusSelect);
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    optionElement.selected = option.value === "missing"; // Set "missing" as default
  });
  statusSelect.style.display = "none"; // Hide the status select by default

  newTask.value = "";
  newTask.focus();

  console.log(document.querySelectorAll(".item")[0].childNodes);
});

const footer = createElement("footer", "footer", "", appContainer);
const footerText = createElement("p", "footerText", "", footer);
footerText.textContent = "Designed with love by claudemalot | © 2025";
