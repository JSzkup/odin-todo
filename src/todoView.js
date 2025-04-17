import { todoClass } from "./todoCreation.js";

function addTodo() {

    const todoForm = document.createElement('form');
    todoForm.classList.add("content");

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    titleInput.id = 'title';

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Description';
    descriptionInput.id = 'description';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dueDate';
    // titleInput.required = true;

    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'priority';

    const priorities = [
        { value: '0', text: 'Low Priority' },
        { value: '1', text: 'Medium Priority' },
        { value: '2', text: 'High Priority' }
    ];

    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority.value;
        option.textContent = priority.text;
        prioritySelect.appendChild(option);
    });

    const notesTextarea = document.createElement('textarea');
    notesTextarea.placeholder = 'Notes';
    notesTextarea.id = 'notes';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create Todo';


    [titleInput, descriptionInput, dateInput, prioritySelect, notesTextarea, submitButton]
        .forEach(element => todoForm.appendChild(element));


    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        const title = titleInput.value;
        const description = descriptionInput.value;
        const dueDate = dateInput.value;
        const priority = prioritySelect.value;
        const notes = notesTextarea.value;

        const newTodo = new todoClass(title, description, dueDate, priority, notes);

        todoForm.reset();

        return newTodo;
    });

    return todoForm;


}

export function todoDOM() {

    const todoArea = document.querySelector("#main-todos");

    // TODO testing how the TODOs will be displayed
    const testTodo = new todoClass("Clean thing", "make a thing clean", "10/28/1998", 2, "no note")

    const todoItself = document.createElement("div");

    const todoTitle = document.createElement("div");
    todoTitle.textContent = testTodo.getTitle;

    const todoDescription = document.createElement("div");
    todoDescription.textContent = testTodo.getDescription;

    const todoDueDate = document.createElement("div");
    todoDueDate.textContent = testTodo.getDueDate;

    const todoPriority = document.createElement("div");
    todoPriority.textContent = testTodo.getPriority;

    const todoNotes = document.createElement("div");

    todoNotes.textContent = testTodo.getNotes;

    [todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes]
        .forEach(element => todoItself.appendChild(element));

    todoArea.appendChild(todoItself);

    const todoButton = document.createElement("button");
    todoButton.classList.add("collapsible");
    todoButton.textContent = "Add Todo";

    const form = addTodo();
    form.style.display = "none";

    todoArea.appendChild(todoButton);
    todoArea.appendChild(form);

    todoButton.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });

}