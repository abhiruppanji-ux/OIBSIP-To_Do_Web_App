let tasks = [];

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = {
        id: Date.now(),
        text: text,
        completed: false,
        addedTime: new Date().toLocaleString(),
        completedTime: ""
    };

    tasks.push(task);
    input.value = "";
    displayTasks();
}

function displayTasks() {
    let pending = document.getElementById("pendingList");
    let completed = document.getElementById("completedList");

    pending.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task " + (task.completed ? "completed" : "pending");

        div.innerHTML = `
            <strong>${task.text}</strong>
            <small>Added: ${task.addedTime}</small>
            ${task.completed ? `<small>Completed: ${task.completedTime}</small>` : ""}
            <div class="actions">
                ${!task.completed ? `<button onclick="completeTask(${task.id})">Complete</button>` : ""}
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        task.completed ? completed.appendChild(div) : pending.appendChild(div);
    });
}

function completeTask(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = true;
            task.completedTime = new Date().toLocaleString();
        }
    });
    displayTasks();
}

function editTask(id) {
    let task = tasks.find(t => t.id === id);
    let newText = prompt("Edit task:", task.text);

    if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        displayTasks();
    }
}

function deleteTask(id) {
    if (confirm("Delete this task?")) {
        tasks = tasks.filter(task => task.id !== id);
        displayTasks();
    }
}
