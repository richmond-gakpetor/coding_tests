document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Render initial todos
    renderTodos();
    
    // Event listeners
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Add a new todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;
        
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        
        todoInput.value = '';
        todoInput.focus();
    }
    
    // Delete a todo
    function deleteTodo(id) {
        if (confirm('Are you sure you want to delete this todo?')) {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        }
    }
    
    // Toggle todo completion status
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveTodos();
        renderTodos();
    }
    
    // Edit a todo
    function editTodo(id) {
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        const todoText = todos.find(todo => todo.id === id).text;
        
        todoItem.innerHTML = `
            <input type="checkbox" ${todos.find(todo => todo.id === id).completed ? 'checked' : ''} disabled>
            <input type="text" class="edit-input" value="${todoText}">
            <div class="actions">
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;
        
        const editInput = todoItem.querySelector('.edit-input');
        const saveBtn = todoItem.querySelector('.save-btn');
        const cancelBtn = todoItem.querySelector('.cancel-btn');
        
        editInput.focus();
        
        saveBtn.addEventListener('click', function() {
            saveEdit(id, editInput.value.trim());
        });
        
        cancelBtn.addEventListener('click', function() {
            renderTodos();
        });
        
        editInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                saveEdit(id, editInput.value.trim());
            } else if (e.key === 'Escape') {
                renderTodos();
            }
        });
    }
    
    // Save an edited todo
    function saveEdit(id, newText) {
        if (newText === '') return;
        
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        
        saveTodos();
        renderTodos();
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Render todos
    function renderTodos() {
        if (todos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-message">
                    No todos yet. Add one above!
                </div>
            `;
            return;
        }
        
        todoList.innerHTML = '';
        
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoItem.dataset.id = todo.id;
            
            todoItem.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <div class="actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            const checkbox = todoItem.querySelector('input[type="checkbox"]');
            const editBtn = todoItem.querySelector('.edit-btn');
            const deleteBtn = todoItem.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', function() {
                toggleTodo(todo.id);
            });
            
            editBtn.addEventListener('click', function() {
                editTodo(todo.id);
            });
            
            deleteBtn.addEventListener('click', function() {
                deleteTodo(todo.id);
            });
            
            todoList.appendChild(todoItem);
        });
    }
});