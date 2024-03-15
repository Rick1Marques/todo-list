import { Draggable } from "../models/drag-drop";
import { Task } from "../models/tasks";
import { BaseComponent } from "./base-component";

export class TaskCard extends BaseComponent<HTMLUListElement, HTMLLIElement> implements Draggable {
  private task: Task;

  constructor(hostElementId: string, task: Task) {
    super("task-card", hostElementId);
    this.task = task;
    this.render();
    this.configure();
  }

  private render() {
    const { title, priority, description, deadline } = this.task;

    this.element.querySelector("h2")!.textContent = title;
    this.element.querySelector("h3")!.textContent = deadline.toString();
    this.element.querySelector("h4")!.textContent = priority;
    this.element.querySelector("p")!.textContent = description;
  }

  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.task.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent) {
    // console.log(event);
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler.bind(this));
    this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
  }
}
