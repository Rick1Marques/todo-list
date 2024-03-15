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
    console.log("add", task);
    this.updateListeners();
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  moveTask(taskId: string, newStatus: TaskStatus) {
    const task = this.tasks.find((task) => task.id === taskId);
    console.log("move", task);
    if (task!.status !== newStatus) {
      task!.status = newStatus;
    }
    this.updateListeners();
  }

  updateListeners() {
    this.listeners.forEach((listenerFn) => {
      listenerFn(this.tasks.slice());
    });
  }
}

export const taskState = TaskState.getInstance();
