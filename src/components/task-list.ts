import { taskState } from "../state/task-state";

export class TaskList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedTasks: any[] = [];

  constructor(private listName: "backlog" | "inProgress" | "review" | "done") {
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.templateElement = document.getElementById("task-list")! as HTMLTemplateElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.listName}-list`;

    taskState.addListener((tasks: any[]) => {
      const relevantTasks = tasks.filter((task) => this.listName === task.status);
      this.assignedTasks = relevantTasks;
      this.renderTasks();
    });
    this.render();
    this.attach();
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

  private attach() {
    this.hostElement.append(this.element);
  }
}
