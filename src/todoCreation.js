

export class todoClass {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; // 0 = low, 1 = medium, 2 = high
        this.notes = notes;
        //  TODO add project here, filter should pull from this
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
}