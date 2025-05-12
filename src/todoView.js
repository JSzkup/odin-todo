import { todoClass } from "./todoCreation.js";
import { format } from "date-fns";


function createTodoElement(todo) {
    //  create div for the todo item
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo-item");

    // set the project as a data attribute for filtering
    todoElement.dataset.project = todo.getProject || "Default";

    // checkbox div
    const todoCheckBoxDiv = document.createElement("div");
    todoCheckBoxDiv.classList.add("todo-checkbox");

    createTodoCheckbox(todoCheckBoxDiv);

    todoElement.appendChild(todoCheckBoxDiv);

    // div for the body of the todo containing all the text
    const todoTextDiv = document.createElement("div");
    todoTextDiv.classList.add("todo-text");

    // div for the delete button
    const todoDeleteDiv = document.createElement("div");
    todoDeleteDiv.classList.add("todo-delete");

    createProjectElement(todo.getProject, todoDeleteDiv);
    deleteTodo(todoDeleteDiv);


    // prepare the todo elements to be added to DOM
    const elements = [
        { content: todo.getTitle, class: 'todo-title' },
        { content: todo.getDescription, class: 'todo-description' },
        { content: todo.getDueDate, class: 'todo-date' },
        { content: convertPriorityToText(todo.getPriority), class: 'todo-priority' },
        { content: todo.getNotes, class: 'todo-notes' }
    ];

    elements.forEach(({ content, class: className }) => {
        const element = document.createElement("div");
        element.textContent = content;
        element.classList.add(className);


        // Allows for inline editing
        element.addEventListener('click', function () {
            let input = document.createElement(className === 'todo-notes' ? 'textarea' : 'input');
            input.value = element.textContent;
            input.classList.add(className, 'editing');

            // Set appropriate input type for date
            if (className === 'todo-date') {
                input.type = 'date';
            }

            // priority as select box
            if (className === 'todo-priority') {
                const select = document.createElement('select');
                ['Low Priority', 'Medium Priority', 'High Priority'].forEach((priority, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = priority;
                    select.appendChild(option);
                });
                input = select;
                input.value = content;
            }

            // save changes when input loses focus or presses enter
            input.addEventListener('blur', saveChanges);
            input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter' && className !== 'todo-notes') {
                    input.blur();
                }
            });

            function saveChanges() {
                // saves the changes to the todo item once done editing
                if (className === 'todo-priority') {
                    // save original value for fallback
                    const oldPriority = element.textContent;

                    if (input.selectedIndex === -1 || !input.options[input.selectedIndex]) {
                        element.textContent = oldPriority;
                    } else {
                        element.textContent = input.options[input.selectedIndex].textContent;

                    }
                } else if (className === 'todo-date') {
                    // save original value for fallback
                    const oldDate = element.textContent;
                    let newDateString = oldDate; // Default to old date if input is invalid

                    // For date inputs
                    if (input.value) { // Check if input has a value
                        newDateString = format(new Date(input.value), "MM/dd/yyyy");
                    }
                    element.textContent = newDateString;
                } else {
                    // For regular text inputs
                    if (!input.value) {
                        return;
                    }
                    element.textContent = input.value;
                }
                input.replaceWith(element);
            }

            element.replaceWith(input);
            input.focus();
        });

        todoTextDiv.appendChild(element);
    });

    todoElement.appendChild(todoTextDiv);

    todoElement.appendChild(todoDeleteDiv);

    return todoElement;
}

function convertPriorityToText(priority) {
    // `converts priority number to a string
    switch (priority) {
        case 0:
            return "Low Priority";
        case 1:
            return "Medium Priority";
        case 2:
            return "High Priority";
    }
}

function createAddTodoButton() {
    // creates a button that functions as a collapsible
    // TODO on press scroll down the screen to see the whole form
    const todoButton = document.createElement("button");
    todoButton.classList.add("collapsible");
    todoButton.textContent = "Add Todo";
    return todoButton;
}

function deleteTodo(todoElement) {
    // creates a delete button that removes the todo item
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        const delTodoElement = deleteButton.parentElement.parentElement;
        delTodoElement.remove();

        // Recreate filter buttons after deletion
        createFilterButtons();
    });

    todoElement.appendChild(deleteButton);
}


function createTodoCheckbox(todoElement) {
    // creates a checkbox that marks the todo item as complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox-btn");

    checkbox.addEventListener("change", () => {
        // Find the parent todo-item element when the checkbox is clicked
        const todoItemDiv = checkbox.closest(".todo-item") || todoElement.closest(".todo-item");
        if (todoItemDiv) {
            if (checkbox.checked) {
                todoItemDiv.classList.add("completed");
            } else {
                todoItemDiv.classList.remove("completed");
            }
        }
    });

    todoElement.appendChild(checkbox);
}

function createProjectElement(project, todoDeleteDiv) {
    // Adds the project name to the delete button div
    const projectElement = document.createElement("div");
    projectElement.classList.add("project-item");
    projectElement.textContent = project;

    todoDeleteDiv.appendChild(projectElement);
    // TODO need to be able to edit the project name
}

function submitTodo(todoArea, todoForm, elements) {
    // submits the todo form and creates a new todo item
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTodo = new todoClass(
            elements.title.value,
            elements.description.value,
            elements.dueDate.value,
            parseInt(elements.priority.value), // turns the priotity string into a number
            elements.notes.value,
            elements.project.value
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

        // Recreate filter buttons after adding a new todo
        createFilterButtons();
    });


}

function addTodoForm(todoArea) {
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
        { type: 'input', attrs: { type: 'text', placeholder: 'Project', id: 'project' } },
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

function createProjectArray() {
    // gets every project from todo items
    const todoElements = document.querySelectorAll(".todo-item");
    let projectArray = [];

    Array.from(todoElements).forEach(element => {
        const todoElementProject = element.dataset.project;
        projectArray.push(todoElementProject);
    });

    // remove duplicates from the project array
    projectArray = [...new Set(projectArray)];

    return projectArray;
}

function filterSelection(filterID) {
    // hides/shows todo items based on their project
    const todoElements = document.querySelectorAll(".todo-item");

    Array.from(todoElements).forEach(element => {
        const todoElementProject = element.dataset.project;
        const isCompleted = element.classList.contains("completed");

        if (filterID === "show-all" && !isCompleted) {
            // Show all elements
            element.classList.remove("hide");
            element.classList.add("show");
        } else if (filterID === "completed" && isCompleted) {
            // Show only completed elements when completed filter is selected
            element.classList.remove("hide");
            element.classList.add("show");
        } else if (filterID === todoElementProject && !isCompleted) {
            // Show only elements matching the project filter that aren't completed
            element.classList.remove("hide");
            element.classList.add("show");
        } else {
            // Hide everything else
            element.classList.remove("show");
            element.classList.add("hide");
        }
    });
}

function createFilterButtons() {
    const filterArea = document.querySelector("#filters");
    // TODO color coordinate todos with their project/filter button

    // Clear the filter area before adding new buttons to prevent duplicates
    clearDiv("#filters");

    // Adds a separate show all button that always appears
    const showAllButton = document.createElement("button");
    showAllButton.classList.add("filter-btn");
    showAllButton.id = "show-all";
    showAllButton.textContent = "Show All";

    filterArea.appendChild(showAllButton);

    const projectArray = createProjectArray();

    // Create filter buttons for each project
    for (let i = 0; i < projectArray.length; i++) {
        const button = document.createElement("button");
        button.classList.add("filter-btn");
        button.id = projectArray[i];
        button.textContent = projectArray[i];

        filterArea.appendChild(button);
    }

    // Adds a button to show completed todos
    const completedButton = document.createElement("button");
    completedButton.classList.add("filter-btn");
    completedButton.id = "completed";
    completedButton.textContent = "Completed";

    filterArea.appendChild(completedButton);

    // re-run function to add event listeners to the new buttons
    filtersDOM();
}

function clearDiv(element) {
    // empties a specified div
    document.querySelector(element).innerHTML = "";
}

function filtersDOM() {

    const filterButtons = document.querySelectorAll(".filter-btn");

    // initialize each filter button with filter function
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Get the filter ID from the clicked button
            const filterId = this.id;
            filterSelection(filterId);

            // adds an active class to the selected filter button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

export function todoDOM() {
    const todoArea = document.querySelector("#main-todos");

    // Create initial test todo
    const testTodo = new todoClass("Clean thing", "make a thing clean", "10/28/1998", 2, "no notes");
    const todoElement = createTodoElement(testTodo);
    todoArea.appendChild(todoElement);

    // Add the "Add Todo" button and form
    const todoButton = createAddTodoButton();
    const form = addTodoForm(todoArea);
    form.style.display = "none";

    todoArea.appendChild(todoButton);
    todoArea.appendChild(form);

    resetForm(todoButton);

    createFilterButtons();
    filtersDOM();


}