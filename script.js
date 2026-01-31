// Select DOM elements
const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task button click
addTaskButton.addEventListener("click", addTask);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();

    // Error handling for empty input
    if (taskText === "") {
        errorMessage.textContent = "Please enter a task name!";
        return;
    }

    errorMessage.textContent = "";

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Save task
    saveTask(task);

    // Render task
    renderTask(task);

    // Clear input
    taskInput.value = "";
}

// Render task in UI
function renderTask(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = task.id;

    if (task.completed) {
        li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Toggle task completion
function toggleTask(taskId) {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    document.querySelector(`[data-id="${taskId}"]`).classList.toggle("completed");
}

// Delete task
function deleteTask(taskId) {
    const tasks = getTasks().filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    taskList.removeChild(taskElement);
}
