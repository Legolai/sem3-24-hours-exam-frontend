import { useState } from "react";
import useModal from "../hooks/useModal";
import useResource from "../hooks/useResource";
import TaskFullDetailed from "../types/entities/taskFullDetailed";
import TaskMini from "../types/entities/taskMini";
import { Modal } from "./basic";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

interface TaskOverviewProps {
	tasks?: TaskMini[];
}

function TasksOverview({ tasks }: TaskOverviewProps) {
	const [showAddHours, toggleAddHours] = useModal();
	const [selectedTask, setSelectedTask] = useState(0);
	const { resource: task, toggleRefresh } = useResource<TaskFullDetailed>(
		"/tasks/" + selectedTask
	);

	return (
		<div className="text-white flex flex-col gap-4 flex-[0.75]">
			<h2 className="text-2xl font-semibold tracking-wider">Tasks</h2>
			<div className="flex flex-col gap-6 ">
				{tasks?.map((t) => (
					<TaskItem
						key={t.taskId}
						select={(id) => {
							setSelectedTask(id);
							toggleRefresh();
							toggleAddHours();
						}}
						task={t}
					/>
				))}
			</div>
			{task && (
				<Modal show={showAddHours} toggle={toggleAddHours}>
					<TaskModal task={task} toggleRefresh={toggleRefresh} />
				</Modal>
			)}
		</div>
	);
}

export default TasksOverview;
