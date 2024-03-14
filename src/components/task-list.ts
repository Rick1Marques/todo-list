import { taskState } from "../state/task-state";
import { Task, TaskStatus } from "../models/tasks";
import { BaseComponent } from "./base-component";
import { TaskCard } from "./task-card";

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
    ulElement.id = `${this.listName}-tasks`;
    this.assignedTasks.forEach((task) => {
      // insert task-card
      new TaskCard(ulElement.id, task);
    });
  }

  private render() {
    this.element.querySelector("h2")!.textContent = this.listName.toUpperCase();
  }
}
