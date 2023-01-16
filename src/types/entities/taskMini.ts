interface TaskMini {
	taskId: number;
	taskTitle: string;
	taskDescription: string;
	subtasks: TaskMini[];
}

export default TaskMini;
