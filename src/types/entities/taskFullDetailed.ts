import ProjectHourDev from "./projectHourDev";
import TaskMini from "./taskMini";

interface TaskFullDetailed {
	taskId: number;
	taskTitle: string;
	taskDescription: string;
	taskCreatedAt: Date;
	taskUpdatedAt: Date;
	projectHours: ProjectHourDev[];
	parentTask: TaskMini;
	subtasks: TaskMini[];
}

export default TaskFullDetailed;
