import { Task, TaskStatus } from "../models/tasks";

class TaskState {
  private tasks: Task[] = [];
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
    const task = new Task(
      Math.random().toString(),
      title,
      priority,
      description,
      deadline,
      TaskStatus.backlog
    );

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
