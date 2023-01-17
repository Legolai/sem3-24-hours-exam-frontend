import TaskMini from "../types/entities/taskMini";
import { Button } from "./basic";

interface TaskItemProps {
	task: TaskMini;
	select: (id: number) => void;
}

function TaskItem({ task, select }: TaskItemProps) {
	return (
		<details className="max-w-full list-none">
			<summary className="text-white flex max-w-full p-2  items-center bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg ">
				<p className="mr-6">{task.taskTitle}</p>
				<Button
					className="h-min max-w-fit ml-auto"
					onClick={() => select(task.taskId)}
				>
					{" "}
					See Task{" "}
				</Button>
			</summary>
			<div className="text-white w-max p-2 mt-2 ml-4 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg ">
				<p>{task.taskDescription}</p>
				{task.subtasks.map((t) => (
					<TaskItem key={t.taskId} select={select} task={t} />
				))}
			</div>
		</details>
	);
}

export default TaskItem;
