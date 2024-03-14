import { Task } from "../models/tasks";
import { BaseComponent } from "./base-component";

export class TaskCard extends BaseComponent<HTMLUListElement, HTMLLIElement> {
  private task: Task;

  constructor(hostElementId: string, task: Task) {
    super("task-card", hostElementId);
    this.task = task;
    this.render();
  }

  private render() {
    const { title, priority, description, deadline } = this.task;

    this.element.querySelector("h2")!.textContent = title;
    this.element.querySelector("h3")!.textContent = deadline.toString();
    this.element.querySelector("h4")!.textContent = priority;
    this.element.querySelector("p")!.textContent = description;
  }
}
