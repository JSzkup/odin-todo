import { todoClass } from "./todoCreation.js";

function createTodoElement(todo) {
    //  create div for the todo item
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo-item");

    // prepare the todo elements to be added to DOM
    const elements = [
        { content: todo.getTitle, class: 'todo-title' },
        { content: todo.getDescription, class: 'todo-description' },
        { content: todo.getDueDate, class: 'todo-date' },
        { content: todo.getPriority, class: 'todo-priority' },
        { content: todo.getNotes, class: 'todo-notes' }
    ];

    elements.forEach(({ content, class: className }) => {
        const element = document.createElement("div");
        element.textContent = content;
        element.classList.add(className);
        todoElement.appendChild(element);
    });

    return todoElement;
}

function createAddTodoButton() {
    // creates a button that functions as a collapsible
    const todoButton = document.createElement("button");
    todoButton.classList.add("collapsible");
    todoButton.textContent = "Add Todo";
    return todoButton;
}

function deleteTodo(todoElement) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        const delTodoElement = deleteButton.parentElement;
        delTodoElement.remove();
    });

    todoElement.appendChild(deleteButton);
}

function editTodo() {
    // TODO need to be able to edit a todo, on click turn it back into a form
}

function createTodoCheckbox(todoElement) {

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            todoElement.classList.add("completed");
        } else {
            todoElement.classList.remove("completed");
        }
    });

    todoElement.appendChild(checkbox);
}

function submitTodo(todoArea, todoForm, elements) {
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTodo = new todoClass(
            elements.title.value,
            elements.description.value,
            elements.dueDate.value,
            elements.priority.value,
            elements.notes.value
        );

        const todoElement = createTodoElement(newTodo);
        todoArea.insertBefore(todoElement, todoForm.previousElementSibling);

        // Reset and reposition form
        todoForm.reset();
        todoForm.style.display = "none";

        // Move the "Add Todo" button and form to the bottom
        const addButton = todoForm.previousElementSibling;
        todoArea.appendChild(addButton);
        todoArea.appendChild(todoForm);
    });
}

function addTodo(todoArea) {
    const todoForm = document.createElement('form');
    todoForm.classList.add("content");

    // array of objects to ready the form elements
    const formElements = [
        { type: 'input', attrs: { type: 'text', placeholder: 'Title', id: 'title' } },
        { type: 'input', attrs: { type: 'text', placeholder: 'Description', id: 'description' } },
        { type: 'input', attrs: { type: 'date', id: 'dueDate' } },
        {
            type: 'select', attrs: { id: 'priority' }, options: [
                { value: '0', text: 'Low Priority' },
                { value: '1', text: 'Medium Priority' },
                { value: '2', text: 'High Priority' }
            ]
        },
        { type: 'textarea', attrs: { placeholder: 'Notes', id: 'notes' } },
        { type: 'button', attrs: { type: 'submit', textContent: 'Create Todo' } }
    ];

    // create the form elements
    const elements = {};
    formElements.forEach(config => {
        const element = document.createElement(config.type);
        Object.assign(element, config.attrs);

        // handles the dropdown
        if (config.type === 'select' && config.options) {
            config.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                element.appendChild(option);
            });
        }

        todoForm.appendChild(element);
        // store the element in the elements object for easy access
        elements[config.attrs.id] = element;
    });

    submitTodo(todoArea, todoForm, elements);

    return todoForm;
}

function resetForm(todoButton) {
    // Toggle form visibility
    todoButton.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
}

export function todoDOM() {
    const todoArea = document.querySelector("#main-todos");

    // Create initial test todo
    const testTodo = new todoClass("Clean thing", "make a thing clean", "10/28/1998", 2, "no note");
    const todoElement = createTodoElement(testTodo);
    todoArea.appendChild(todoElement);

    // TODO get these working with newly added elements
    createTodoCheckbox(todoElement);
    deleteTodo(todoElement);

    // Add the "Add Todo" button and form
    const todoButton = createAddTodoButton();
    const form = addTodo(todoArea);
    form.style.display = "none";

    todoArea.appendChild(todoButton);
    todoArea.appendChild(form);

    resetForm(todoButton);


}