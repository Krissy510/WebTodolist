// Get docs element
const todolist = document.querySelector(".todo-list");
const form = document.querySelector(".form-task");
const task_input = document.querySelector("#task-input");
const task_type = document.querySelector("#type-select");
const add_button = document.querySelector(".add-bt");
const theme_icon = document.querySelector(".theme-icon");


// Dark/Light mode

function setTheme(theme){ // 1 -> darkmode 0-> light
    const primary = theme ? "white" : "black";
    const secondary = theme ? "black" : "white";
    const filter = theme ? "invert(100%)" : "none";
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    theme_icon.style.filter = filter;
}

function toggleTheme(){
    setTheme(isDark())
}

function isDark(){
    return document.documentElement.style.getPropertyValue("--primary-color")== "black";
}

theme_icon.addEventListener("click", toggleTheme)

// Intial load

const userPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(userPrefersDarkMode);

// Add functionality && Lifecyle

const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

const todoData = [];

function isPast(date){
    return date < new Date();
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


existingTodos.forEach(todo => {
    if(todo.bff != undefined){
        const bff = Date.parse(todo.bff)
        if(!isPast(bff)){
            taskAdd(todo);
        }
    }
    else taskAdd(todo);
    
});

function updateLocalStroage(){
    localStorage.setItem('todos', JSON.stringify(todoData));
}

function taskAdd(task){
    var todo_task = document.createElement("div");
    todo_task.classList.add("todo-task");
    var task_p = document.createElement("p");
    task_p.textContent = task.detail;
    todoData.push(task);
    updateLocalStroage();
    var remove_bt  = document.createElement("div");
    remove_bt.classList.add("remove-bt");
    remove_bt.addEventListener('click', ()=> {
        todo_task.remove()
        const remove_i = todoData.indexOf(task);
        todoData.splice(remove_i, 1);
        updateLocalStroage();
    })
    todo_task.append(task_p);
    todo_task.append(remove_bt);
    todolist.append(todo_task)
}

function getTaskDetail(){return task_input.value}
function getTaskType(){return task_type.value}

add_button.addEventListener("click", () => {
    const new_task = {}
    new_task.detail = getTaskDetail();
    new_task.type = getTaskType();
    if(new_task.detail == ""){
        alert("Please fill in the blank before add");
        return;
    }
    if(new_task.type == "today"){
        new_task.bbf = new Date();
        new_task.bbf = new_task.bbf.addDays(1);
    }
    taskAdd(new_task);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const new_task = {}
    new_task.detail = getTaskDetail();
    new_task.type = getTaskType();
    if(new_task.type == "today"){
        new_task.bbf = new Date();
        new_task.bbf = new_task.bbf.addDays(1);
    }
    taskAdd(new_task);
})


