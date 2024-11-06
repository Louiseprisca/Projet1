document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const taskCount = document.getElementById("task-count");
    const filterButtons = document.querySelectorAll(".filter-button");
    const clearAllButton = document.getElementById("clear-all-button");

    let tasks = [];

    // Mise à jour du compteur de tous les tâches
    function updateTaskCount() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCount.textContent = `Total: ${totalTasks} | Terminées: ${completedTasks}`;
    }

    // Ajouter une tâche
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        todoInput.value = "";

        renderTasks();
        updateTaskCount();

        // Supprimer une tâche
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        updateTaskCount();
    }
    // Marquer une tâche comme terminée
    function toggleTaskCompletion(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
        renderTasks();
        updateTaskCount();
    }

    // Filtrage des tâches
    function filterTasks(filter) {
        let filteredTasks = tasks;
        if (filter === "completed") {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === "active") {
            filteredTasks = tasks.filter(task => !task.completed);
        }
        renderTasks(filteredTasks);
    }

    }})