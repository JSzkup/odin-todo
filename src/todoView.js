import { todoClass } from "./todoCreation.js";

export function addTodo() {


    return new todoClass(title, description, dueDate, priority, notes)
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

    // TODO each todo should be a li in a ul

    todoItself.appendChild(todoTitle);
    todoItself.appendChild(todoDescription);
    todoItself.appendChild(todoDueDate);
    todoItself.appendChild(todoPriority);
    todoItself.appendChild(todoNotes);

    todoArea.appendChild(todoItself);

    const todoButton = document.createElement("button");
    todoButton.classList.add("collapsible");
    todoButton.textContent = "Add Todo";

    const todoForm = document.createElement("div");
    todoForm.classList.add("content");

    todoForm.innerHTML = `
    <form>
        <input type="text" placeholder="Title">
        <input type="text" placeholder="Description">
        <input type="date" placeholder="Due Date">
        <select>
            <option value="0">Low Priority</option>
            <option value="1">Medium Priority</option>
            <option value="2">High Priority</option>
        </select>
        <textarea placeholder="Notes"></textarea>
    </form>
    `;

    // TODO this form needs to return into the todo object



    todoArea.appendChild(todoButton);
    todoArea.appendChild(todoForm);

    todoButton.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });

    // let coll = document.getElementsByClassName("collapsible");
    // let i;

    // for (i = 0; i < coll.length; i++) {
    //     coll[i].addEventListener("click", function () {
    //         this.classList.toggle("active");
    //         var content = this.nextElementSibling;
    //         if (content.style.display === "block") {
    //             content.style.display = "none";
    //         } else {
    //             content.style.display = "block";
    //         }
    //     });
    // }


}