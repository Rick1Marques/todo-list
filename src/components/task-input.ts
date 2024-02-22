export class TaskInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById(
      "inputs"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const inputData = this.gatherData();
    console.log(inputData);
  }

  private gatherData(): [string, string, string, Date] {
    const titelInput = (document.getElementById("titel")! as HTMLInputElement)
      .value;
    const priorityInput = (
      document.getElementById("priority")! as HTMLInputElement
    ).value;
    const descriptionInput = (
      document.getElementById("description")! as HTMLInputElement
    ).value;
    const deadlineInput = (
      document.getElementById("deadline")! as HTMLInputElement
    ).value;
    return [
      titelInput,
      priorityInput,
      descriptionInput,
      new Date(deadlineInput),
    ];
  }

  private attach() {
    this.hostElement.append(this.element);
  }
}
