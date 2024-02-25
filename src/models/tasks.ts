export enum TaskStatus {
  backlog = "backlog",
  inProgress = "inProgress",
  review = "review",
  done = "done",
}

export class Task {
  constructor(
    public id: string,
    public title: string,
    public priority: string,
    public description: string,
    public deadline: Date,
    public status: TaskStatus
  ) {}
}
