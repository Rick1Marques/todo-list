export abstract class BaseComponent<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(templateElementId: string, hostElementId: string) {
    this.templateElement = document.getElementById(templateElementId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;

    this.attach();
  }

  private attach() {
    this.hostElement.append(this.element);
  }
}
