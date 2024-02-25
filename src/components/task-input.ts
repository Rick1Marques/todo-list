import { taskState } from "../state/task-state";
import { BaseComponent } from "./base-component";

export class TaskInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
  titelElement: HTMLInputElement;
  priorityElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  deadlineElement: HTMLInputElement;

  constructor() {
    super("inputs", "app");

    this.titelElement = this.element.querySelector("#titel")! as HTMLInputElement;
    this.priorityElement = this.element.querySelector("#priority")! as HTMLInputElement;
    this.descriptionElement = this.element.querySelector("#description")! as HTMLInputElement;
    this.deadlineElement = this.element.querySelector("#deadline")! as HTMLInputElement;

    this.configure();
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
}
