import { taskState } from "../state/task-state";

export class TaskInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById("inputs")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.configure();
    this.attach();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const inputData = this.gatherData();
    const [title, priority, description, deadline] = inputData;
    taskState.addTask(title, priority, description, deadline);
  }

  private gatherData(): [string, string, string, Date] {
    const titelInput = (document.getElementById("titel")! as HTMLInputElement).value;
    const priorityInput = (document.getElementById("priority")! as HTMLInputElement).value;
    const descriptionInput = (document.getElementById("description")! as HTMLInputElement).value;
    const deadlineInput = (document.getElementById("deadline")! as HTMLInputElement).value;
    return [titelInput, priorityInput, descriptionInput, new Date(deadlineInput)];
  }

  private attach() {
    this.hostElement.append(this.element);
  }
}
