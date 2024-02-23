export class TaskList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  constructor(private listName: "backlog" | "inProgress" | "review" | "done") {
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.templateElement = document.getElementById("task-list")! as HTMLTemplateElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.render();
    this.attach();
  }

  private attach() {
    this.hostElement.append(this.element);
  }

  private render() {
    this.element.querySelector("h2")!.textContent = this.listName.toUpperCase();
  }
}
