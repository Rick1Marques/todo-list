import { TaskInput } from "./components/task-input";
import { TaskList } from "./components/task-list";

new TaskInput();
new TaskList("backlog");
new TaskList("inProgress");
new TaskList("review");
new TaskList("done");
