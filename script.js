document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const taskCount = document.getElementById("task-count");
    const filterButtons = document.querySelectorAll(".filter-button");
    const clearAllButton = document.getElementById("clear-all-button");

    // Charger les tâches depuis le localStorage
    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Sauvegarder les tâches dans le localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    let tasks = loadTasks();


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
        
        saveTasks(); // Sauvegarder après ajout
        renderTasks();
        updateTaskCount();
    }

        // Supprimer une tâche
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        
        saveTasks(); // Sauvegarder après suppression
        renderTasks();
        updateTaskCount();
    }
   
    // Marquer une tâche comme terminée
    function toggleTaskCompletion(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasks(); // Sauvegarder après modification
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
    
    // Effacer toutes les tâches
    function clearAllTasks() {
        tasks = [];
        
        saveTasks(); // Sauvegarder après effacement
        renderTasks();
        updateTaskCount();
    }

    
    // Rendu des tâches dans la liste
    function renderTasks(filteredTasks = tasks) {
        todoList.innerHTML = "";
        filteredTasks.forEach(task => {
            const taskItem = document.createElement("div");
            taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

            taskItem.innerHTML = `
                <div class=""> 
                    <span class="task-text">${task.text}</span>
                    <button class="complete-button">${task.completed ? "Annuler" : "Terminer"}</button>
                    <button class="delete-button">Supprimer</button>
                </div>
            `;

            // Ajouter les événements aux boutons "Terminer" et "Supprimer"
            taskItem.querySelector(".complete-button").addEventListener("click", () => toggleTaskCompletion(task.id));
            taskItem.querySelector(".delete-button").addEventListener("click", () => deleteTask(task.id));

            todoList.appendChild(taskItem);
        });

        }
    
    // Événements
    addButton.addEventListener("click", addTask);
    clearAllButton.addEventListener("click", clearAllTasks);
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterTasks(button.dataset.filter);
        });
    });

    // permet d'ajouter  la tache avec la touche "Enter"
    todoInput.addEventListener("key up",(e)=>{
        if(e.key==="Enter") addTask();
    });
    
    // Initialisation
    renderTasks(); // Rendre les tâches initiales
    updateTaskCount();
    })