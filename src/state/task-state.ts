class TaskState {
  private tasks: any[] = [];
  private listeners: Function[] = [];
  private static instance: TaskState;
  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TaskState();
    return this.instance;
  }

  addTask(title: string, priority: string, description: string, deadline: Date) {
    const task = {
      id: Math.random().toString(),
      title: title,
      priority: priority,
      description: description,
      deadline: deadline,
    };
    this.tasks.push(task);
    this.listeners.forEach((listenerFn) => {
      listenerFn(this.tasks.slice());
    });
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }
}

export const taskState = TaskState.getInstance();
