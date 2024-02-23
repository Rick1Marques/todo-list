import { TaskList } from "../components/task-list";

class TaskState {
  private tasks: any[] = [];
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
  }
}

export const taskState = TaskState.getInstance();
