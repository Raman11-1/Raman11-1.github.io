var TodoListApp = (function() {
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    var a = 10;
    async function fetchTodos() {
        //GET request ..
        // fetch('https://jsonplaceholder.typicode.com/todos')
        //     .then(function(response) {
        //         console.log("Response", response)
        //         return response.json();
        //     }).then(function(data) {
        //         // console.log(data);
        //         tasks = data.slice(0, 10);
        //         renderList();
        //     })
        //     .catch(function(error) {
        //         console.log('error', error);
        //     })

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log(error);
        }
    }

    function addTaskDOM(task) {
        const li = document.createElement('li');

        li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
        `
        taskList.append(li);
    }

    function renderList() {
        taskList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskDOM(tasks[i]);
        }

        tasksCounter.innerHTML = `<b>${tasks.length}</b>`;
    }

    function toggleTask(taskId) {
        for (let i = 0; i < tasks.length; ++i) {
            if (Number(taskId) === tasks[i]['id']) {
                tasks[i]['completed'] = !tasks[i]['completed']
                renderList();
                showNotification('Task toggle successfully')
                return;
            }
        }
        showNotification('Id does not found !')
    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter(function(task) {
            return task.id !== Number(taskId);
        })
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully !')
    }

    function addTask(task) {
        if (task) {
            // fetch('https://jsonplaceholder.typicode.com/todos', {
            //         method: 'POST',
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(task),
            //     }).then(function(response) {
            //         console.log("Response", response)
            //         return response.json();
            //     }).then(function(data) {
            //         // console.log(data);
            //         tasks = data.slice(0, 10);
            //         // renderList();
            //         tasks.push(task);
            //         renderList();
            //         showNotification('Task added successfully !');

            //     })
            //     .catch(function(error) {
            //         console.log('error', error);
            //     })
            tasks.push(task);
            renderList();
            showNotification('Task added successfully !');
            return;
        }
        showNotification('Task can not be added');
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeypress(e) {
        if (e.key === 'Enter') {
            const text = e.target.value;
            console.log(text);

            if (!text) {
                showNotification('Task text can not be empty');
                return;
            }

            const task = {
                title: text,
                id: Date.now(),
                completed: false
            }

            e.target.value = '';
            addTask(task)
        }
    }

    function handleClickListener(e) {
        const target = e.target
            // console.log(target)
        if (target.className == 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return
        } else if (target.className == 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return
        } else {
            return;
        }
    }


    function initializeApp() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        document.addEventListener('click', handleClickListener)
    }

    // intializeling();
    return {
        initialize: initializeApp,
        a: a
    }
})();