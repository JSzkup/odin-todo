import { format } from "date-fns";

export class todoClass {
    constructor(title, description, dueDate, priority, notes, project) {
        // constructors with default values
        this.title = title || "Untitled Todo";
        this.description = description || "No Description";
        this.dueDate = dueDate || format(new Date(), "MM/dd/yyyy");
        this.priority = priority !== undefined && priority !== null ? priority : 0; // Default priority to Low (0)
        this.notes = notes || "no notes";
        this.project = project || "Default";
    }

    get getTitle() {
        return this.title;
    }

    set setTitle(title) {
        this.title = title;
    }

    get getDescription() {
        return this.description;
    }

    set setDescription(description) {
        this.description = description;
    }
    get getDueDate() {
        return this.dueDate;
    }
    set setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    get getPriority() {
        return this.priority;
    }
    set setPriority(priority) {
        this.priority = priority;
    }
    get getNotes() {
        return this.notes;
    }
    set setNotes(notes) {
        this.notes = notes;
    }
    get getProject() {
        return this.project;
    }
    set setProject(project) {
        this.project = project;
    }
}