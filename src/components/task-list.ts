import { taskState } from "../state/task-state";
import { Task, TaskStatus } from "../models/tasks";
import { BaseComponent } from "./base-component";
import { TaskCard } from "./task-card";
import { DropTarget } from "../models/drag-drop";

export class TaskList extends BaseComponent<HTMLDivElement, HTMLElement> implements DropTarget {
  assignedTasks: Task[] = [];

  constructor(private listName: TaskStatus) {
    super("task-list", "app");

    this.configure();
    this.render();
  }

  private render() {
    this.element.id = `${this.listName}-list`;
    this.element.querySelector("h2")!.textContent = this.listName.toUpperCase();
  }

  dragOverHandler(event: DragEvent) {
    event.preventDefault();
  }

  dropHandler(event: DragEvent) {
    const taskId = event.dataTransfer!.getData("text/plain");
    taskState.moveTask(taskId, this.listName);
  }

  dragLeaveHandler(_: DragEvent) {}

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
    this.element.addEventListener("drop", this.dropHandler.bind(this));
    this.element.addEventListener("dragleave", this.dragLeaveHandler.bind(this));

    taskState.addListener((tasks: Task[]) => {
      const relevantTasks = tasks.filter((task) => this.listName === task.status);
      this.assignedTasks = relevantTasks;
      this.renderTasks();
    });
  }
  private renderTasks() {
    const ulElement = this.element.querySelector("ul")! as HTMLUListElement;
    ulElement.innerHTML = "";
    ulElement.id = `${this.listName}-tasks`;
    this.assignedTasks.forEach((task) => {
      new TaskCard(ulElement.id, task);
    });
  }
}
