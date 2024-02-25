import { TaskInput } from "./components/task-input";
import { TaskList } from "./components/task-list";
import { TaskStatus } from "./models/tasks";

new TaskInput();
new TaskList(TaskStatus.backlog);
new TaskList(TaskStatus.inProgress);
new TaskList(TaskStatus.review);
new TaskList(TaskStatus.done);
