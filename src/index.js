import "./styles.css";
import { todoClass } from "./todoCreation.js";

// Where the todo objects will be stored
let projectArray = [];


const testTodo = new todoClass("Clean thing", "make a thing clean", "10/28/1998", 2, "no note")

projectArray.push(testTodo);

console.log(projectArray[0].getTitle)
console.log(projectArray)