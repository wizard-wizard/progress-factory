const projectColors = {
    "Worldbuilder MVP": "#6699cc",
    "Ssscoop Branding": "#996600",
    "Pigeon Enrichment": "#669966",
    "Factory Maintenance": "#666666",
    "Personal Progress": "#9999cc"
}

let tasks = JSON.parse(localStorage.getItem("pigeonFactoryTasks")) || [
    { text: "Write 1 onboarding sentence", project: "Worldbuilder MVP", done: false },
    { text: "Sketch 1 room map", project: "Worldbuilder MVP", done: false },
    { text: "Invent 3 snake-based flavors", project: "Ssscoop Branding", done: false },
    { text: "Celebrate 1 small win", project: "Personal Progress", done: false },
    { text: "Draw a tiny pigeon engineer", project: "Pigeon Enrichment", done: false },
    { text: "Take a snack break", project: "Pigeon Enrichment", done: false },
    { text: "Draft 1 magical room description", project: "Worldbuilder MVP", done: false },
    { text: "Collect 1 scrap of inspiration from the factory floor", project: "Factory Maintenance", done: false },
];

let totalCompletedCount = parseInt(localStorage.getItem("pigeonFactoryScore")) || 0;

const taskList = document.getElementById('taskList');
const scoreDisplay = document.getElementById('score');

function saveTasks() {
    localStorage.setItem("pigeonFactoryTasks", JSON.stringify(tasks));
    localStorage.setItem("pigeonFactoryScore", totalCompletedCount.toString());
}

function renderTasks() {
    taskList.innerHTML = '';
    let sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1);

    sortedTasks.forEach((task, index) => {
        const div = document.createElement('div');
        div.className = 'task' + (task.done ? ' done' : '');
        div.style.borderColor = projectColors[task.project] || "#b58b6a";

        // Random tape style variables

        const tapeColors = [
            '#00e5e5',
            '#39ff14',
            '#f8ff7a',
            '#ff6600',
            '#cc66ff'
        ];
        const randomColor = tapeColors[Math.floor(Math.random() * tapeColors.length)];
        let randomAngle;
        do {
            randomAngle = Math.floor(Math.random() * 30) - 15; // -15deg to +15deg
        } while (randomAngle > -5 && randomAngle < 5); // Reroll if too flat

        const randomLength = Math.floor(Math.random() * 30) + 60; // 60px to 90px
        const randomLeft = Math.floor(Math.random() * 40) - 20; // -20px to +20px

        div.style.setProperty('--tape-color', randomColor);
        div.style.setProperty('--tape-angle', `${randomAngle}deg`);
        div.style.setProperty('--tape-length', `${randomLength}px`);
        div.style.setProperty('--tape-left', `${randomLeft}px`);


        div.innerHTML = `
      <div class="task-text" style="color:${projectColors[task.project] || '#333'}">
        <strong>[${task.project}]</strong> ${task.text}
      </div>
      <div class="task-controls">
        <button class="complete" onclick="toggleTask(${tasks.indexOf(task)})">${task.done ? 'Undo' : 'Complete'}</button>
        <button class="edit" onclick="editTask(${tasks.indexOf(task)})">✏️</button>
        <button class="delete" onclick="deleteTask(${tasks.indexOf(task)})">🗑️</button>
      </div>
    `;

        div.style.setProperty('--tape-color', randomColor);
        div.style.setProperty('--tape-angle', `${randomAngle}deg`);
        div.style.setProperty('--tape-length', `${randomLength}px`);
        div.style.setProperty('--tape-left', `${randomLeft}px`);

        // div.style.setProperty('--tape-color-2', randomColor2);
        // div.style.setProperty('--tape-angle-2', `${randomAngle2}deg`);
        // div.style.setProperty('--tape-length-2', `${randomLength2}px`);
        // div.style.setProperty('--tape-left-2', `${randomLeft2}px`);

        taskList.appendChild(div);
    });

    updateScore(false);
}

function updateScore(shouldBounce = true) {
    scoreDisplay.innerText = `Tasks Processed: ${totalCompletedCount}`;
    if (shouldBounce) {
        scoreDisplay.style.transform = 'scale(1.3) rotate(2deg)';
        setTimeout(() => {
            scoreDisplay.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }
}

function toggleTask(index) {
    const wasDone = tasks[index].done;
    tasks[index].done = !tasks[index].done;

    if (tasks[index].done && !wasDone) {
        totalCompletedCount++;
    } else if (!tasks[index].done && wasDone) {
        totalCompletedCount--;
    }

    saveTasks();
    renderTasks();

    //animations after update
    setTimeout(() => {
        renderTasks();
        updateScore(true);
    }, 1000);
}


function addNewTask() {
    const text = document.getElementById('newTaskText').value.trim();
    const project = document.getElementById('newTaskProject').value;
    if (text) {
        tasks.push({ text, project, done: false });
        saveTasks();
        renderTasks();
        document.getElementById('newTaskText').value = '';
    }
}

function editTask(index) {
    const newText = prompt("Edit your tiny step:", tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function animateAndRender() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(t => t.classList.add('fading'));
    setTimeout(() => {
        renderTasks();
        updateScore(true);
    }, 2000);
}

function factoryReset() {
    localStorage.removeItem("pigeonFactoryTasks");
    localStorage.removeItem("pigeonFactoryScore");
    window.location.reload();
}

renderTasks();
