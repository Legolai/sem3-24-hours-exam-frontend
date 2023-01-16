import TaskMini from "../types/entities/taskMini";
import { Button } from "./basic";

interface TaskItemProps {
	task: TaskMini;
	select: (id: number) => void;
}

function TaskItem({ task, select }: TaskItemProps) {
	return (
		<details className="w-max list-none">
			<summary className="text-white flex w-max p-2 justify-between items-center bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg ">
				<p className="mr-6">{task.taskTitle}</p>
				<Button className="h-min w-fit" onClick={() => select(task.taskId)}>
					{" "}
					Add hours{" "}
				</Button>
			</summary>
			<div className="text-white w-max p-2  bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg ">
				<p>{task.taskDescription}</p>
				{task.subtasks.map((t) => (
					<TaskItem key={t.taskId} select={select} task={t} />
				))}
			</div>
		</details>
	);
}

export default TaskItem;
