import { taskState } from "../state/task-state";
import { Task, TaskStatus } from "../models/tasks";
import { BaseComponent } from "./base-component";

export class TaskList extends BaseComponent<HTMLDivElement, HTMLElement> {
  assignedTasks: Task[] = [];

  constructor(private listName: TaskStatus) {
    super("task-list", "app");
    this.element.id = `${this.listName}-list`;

    taskState.addListener((tasks: Task[]) => {
      const relevantTasks = tasks.filter((task) => this.listName === task.status);
      this.assignedTasks = relevantTasks;
      this.renderTasks();
    });
    this.render();
  }

  private renderTasks() {
    const ulElement = this.element.querySelector("ul")! as HTMLUListElement;
    ulElement.innerHTML = "";
    this.assignedTasks.forEach((task) => {
      const liElement = document.createElement("li");
      liElement.textContent = task.title;
      ulElement.appendChild(liElement);
    });
  }

  private render() {
    this.element.querySelector("h2")!.textContent = this.listName.toUpperCase();
  }
}
