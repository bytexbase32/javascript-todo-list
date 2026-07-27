
const tasks = document.querySelector("#tasks");

const addElement = document.querySelector("#btn-add");

const inputElement = document.querySelector("#task-input")

inputElement.focus();

let todos = loadTasks();

todos.forEach(task => {
    tasks.appendChild(newTask(task));
});


addElement.addEventListener("click", () => {
    const text = inputElement.value.trim();
    if (text === "")
        return;
    
    const task = {
        text: text,
        completed: false
    };
    todos.push(task);
    saveTasks(todos);

    tasks.appendChild(newTask(task));

    inputElement.value   = "";
    inputElement.focus();
    console.log(todos);
});

inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addElement.click();
    }
});

function newTask(taskData) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (taskData.completed)
        taskElement.classList.add("completed");
    const spanEle = document.createElement("span");
    spanEle.textContent = taskData.text;
    spanEle.addEventListener("click", () => {
        taskElement.classList.toggle("completed");
        taskData.completed = taskElement.classList.contains("completed");

        saveTasks(todos);
    });
    
    const buttonEle = document.createElement("button");
    buttonEle.classList.add("delete-btn");
    buttonEle.textContent = "Delete";
    buttonEle.addEventListener("click", () => {
        taskElement.remove();
        todos = todos.filter((t) => t !== taskData);
        saveTasks(todos);
    });

    taskElement.appendChild(spanEle);
    taskElement.appendChild(buttonEle);

    return taskElement;
}

function saveTasks(tasks) {
    localStorage.setItem("todo-app", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem("todo-app");
    if (!tasks)
        return [];
    return JSON.parse(tasks);
}


