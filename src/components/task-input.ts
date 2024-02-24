import { taskState } from "../state/task-state";

export class TaskInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  titelElement: HTMLInputElement;
  priorityElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  deadlineElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById("inputs")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;

    this.titelElement = this.element.querySelector("#titel")! as HTMLInputElement;
    this.priorityElement = this.element.querySelector("#priority")! as HTMLInputElement;
    this.descriptionElement = this.element.querySelector("#description")! as HTMLInputElement;
    this.deadlineElement = this.element.querySelector("#deadline")! as HTMLInputElement;

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
    this.clearForm();
  }

  private gatherData(): [string, string, string, Date] {
    const titelInput = this.titelElement.value;
    const priorityInput = this.priorityElement.value;
    const descriptionInput = this.descriptionElement.value;
    const deadlineInput = this.deadlineElement.value;
    return [titelInput, priorityInput, descriptionInput, new Date(deadlineInput)];
  }

  private clearForm() {
    this.titelElement.value = "";
    this.priorityElement.value = "";
    this.descriptionElement.value = "";
    this.deadlineElement.value = "";
  }

  private attach() {
    this.hostElement.append(this.element);
  }
}
