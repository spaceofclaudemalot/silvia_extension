import { createElement, importanceLevelsOptions } from "./utils.js";
import { saveData, loadData } from "./storage.js";

// Utility function to calculate remaining days
function getRemainingDays(
  dueDate,
  today = new Date().toISOString().split("T")[0]
) {
  const due = new Date(dueDate);
  const now = new Date(today);
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

class TaskManager {
  constructor() {
    this.today = new Date().toISOString().split("T")[0];
    this.initializeUI();
    this.setupEventListeners();
    this.loadDataFromStorage();
  }

  initializeUI() {
    this.taskManagerApp = createElement(
      "div",
      "task-manager-app",
      "",
      document.body
    );
    this.tasksToDoContainer = createElement(
      "div",
      "tasks-todo-container",
      "",
      this.taskManagerApp
    );
    this.tasksToDoList = createElement(
      "ul",
      "tasks-todo-list",
      "",
      this.tasksToDoContainer
    );
    this.allTasksContainer = createElement(
      "div",
      "all-tasks-container",
      "",
      this.taskManagerApp
    );
    this.allTasksList = createElement(
      "ul",
      "all-tasks-list",
      "",
      this.allTasksContainer
    );
    this.notesContainer = createElement(
      "div",
      "notes-container",
      "",
      this.taskManagerApp
    );
    this.notes = createElement("input", "notes", "", this.notesContainer);
    this.notes.type = "text";
    this.notes.placeholder = "Add quick notes here";
    this.createTaskForm();
  }

  createTaskForm() {
    this.form = createElement("form", "", "", this.allTasksContainer);
    this.taskInput = createElement("input", "task-input", "", this.form);
    this.setupTaskInput();
  }

  setupTaskInput() {
    Object.assign(this.taskInput, {
      type: "text",
      placeholder: "+ Add a new task",
      minLength: 2,
      required: true,
    });
    this.taskInput.focus();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (event) =>
      this.handleTaskSubmission(event)
    );
    this.notes.addEventListener("input", () => this.saveAllDataToStorage());
  }

  createTaskElement(
    taskText,
    importance = 3,
    dueDate = undefined,
    targetList = null
  ) {
    // Determine the correct list if not specified
    if (!targetList) {
      if (importance >= 3 && getRemainingDays(dueDate, this.today) <= 3) {
        targetList = this.tasksToDoList;
      } else {
        targetList = this.allTasksList;
      }
    }

    const taskItem = createElement("li", "", "task-element", targetList);

    // Create a span for the task name
    const taskNameSpan = createElement(
      "span",
      "",
      "task-element__name",
      taskItem
    );
    taskNameSpan.textContent = taskText;

    const importanceSelect = this.createImportanceSelect(taskItem, importance);
    const taskDueDate = this.createDueDateInput(taskItem, dueDate);
    const deleteButton = this.createDeleteButton(taskItem);

    // Display remaining days and update status on change
    const updateTaskInfo = () => {
      const days = taskDueDate.value
        ? getRemainingDays(taskDueDate.value, this.today)
        : "";
      taskItem.setAttribute("data-remaining-days", days);
      // Move to correct list if needed
      let newTarget;
      if (
        Number(importanceSelect.value) >= 3 &&
        taskDueDate.value &&
        getRemainingDays(taskDueDate.value, this.today) <= 3
      ) {
        newTarget = this.tasksToDoList;
      } else {
        newTarget = this.allTasksList;
      }
      if (taskItem.parentNode !== newTarget) {
        newTarget.appendChild(taskItem);
      }
      this.saveAllDataToStorage();
    };

    importanceSelect.addEventListener("change", updateTaskInfo);
    taskDueDate.addEventListener("change", updateTaskInfo);

    deleteButton.addEventListener("click", () => {
      taskItem.parentNode.removeChild(taskItem);
      this.saveAllDataToStorage();
    });

    // Initial set if date is present
    if (taskDueDate.value) {
      updateTaskInfo();
    }

    return taskItem;
  }

  createImportanceSelect(taskItem, selectedValue = 3) {
    const importanceSelect = createElement(
      "select",
      "",
      "task-element__importance",
      taskItem
    );
    importanceLevelsOptions.forEach(({ value, label }) => {
      const option = createElement(
        "option",
        "",
        "task-element__importance__option",
        importanceSelect
      );
      Object.assign(option, {
        value,
        textContent: label,
        selected: value === selectedValue,
      });
    });
    return importanceSelect;
  }

  createDueDateInput(taskItem, value) {
    const taskDueDate = createElement(
      "input",
      "",
      "task-element__dueDate",
      taskItem
    );
    Object.assign(taskDueDate, {
      type: "date",
      required: false,
    });
    if (value) {
      taskDueDate.value = value;
    }
    return taskDueDate;
  }

  createDeleteButton(taskItem) {
    ``;
    const deleteButton = createElement(
      "button",
      "",
      "task-delete-button",
      taskItem
    );
    deleteButton.textContent = "❌";
    // moved event listener to createTaskElement for storage update
    return deleteButton;
  }

  updateTaskStatus(taskItem, importanceSelect, taskDueDate, taskText) {
    console.log(`task info
      name : ${taskText}
      importance : ${importanceSelect.value}
      dueDate : ${taskDueDate.value}
      remainingDays : ${
        taskDueDate.value ? getRemainingDays(taskDueDate.value, this.today) : ""
      } `);

    if (
      importanceSelect.value >= "3" &&
      taskDueDate.value &&
      getRemainingDays(taskDueDate.value, this.today) <= 3
    ) {
      const tasksToDoList = document.querySelector("#tasks-todo-list");
      tasksToDoList.appendChild(taskItem);
    } else {
      const allTasksList = document.querySelector("#all-tasks-list");
      allTasksList.appendChild(taskItem);
    }
  }

  handleTaskSubmission(event) {
    event.preventDefault();
    const taskText = this.taskInput.value.trim();
    if (taskText) {
      this.createTaskElement(taskText);
      this.saveAllDataToStorage();
      this.taskInput.value = "";
    }
  }

  saveAllDataToStorage() {
    // Gather all tasks from DOM
    const allTaskItems = document.querySelectorAll(".task-element");
    const tasks = Array.from(allTaskItems).map((taskItem) => ({
      text: taskItem.querySelector(".task-element__name").textContent,
      importance: Number(
        taskItem.querySelector(".task-element__importance").value
      ),
      dueDate: taskItem.querySelector(".task-element__dueDate").value,
    }));
    const notes = this.notes.value;
    saveData({ tasks, notes });
  }

  loadDataFromStorage() {
    const { tasks, notes } = loadData();
    this.notes.value = notes || "";
    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        // Restore in correct list as before saving
        let targetList;
        if (
          Number(task.importance) >= 3 &&
          task.dueDate &&
          getRemainingDays(task.dueDate, this.today) <= 3
        ) {
          targetList = this.tasksToDoList;
        } else {
          targetList = this.allTasksList;
        }
        this.createTaskElement(
          task.text,
          task.importance,
          task.dueDate,
          targetList
        );
      });
    }
  }
}

export { TaskManager };
