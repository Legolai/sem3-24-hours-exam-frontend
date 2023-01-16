import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import useModal from "../hooks/useModal";
import TaskMini from "../types/entities/taskMini";
import { Modal } from "./basic";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

interface TaskOverviewProps {
	tasks?: TaskMini[];
}

function TasksOverview({ tasks }: TaskOverviewProps) {
	const { hasAccessRights } = useAuth();
	const [showAddHours, toggleAddHours] = useModal();
	const [selectedTask, setSelectedTask] = useState(0);

	return (
		<div>
			<h2>Tasks</h2>
			<div className="flex flex-col gap-6">
				{tasks?.map((t) => (
					<TaskItem
						key={t.taskId}
						select={(id) => {
							setSelectedTask(id);
							toggleAddHours();
						}}
						task={t}
					/>
				))}
			</div>
			<Modal show={showAddHours} toggle={toggleAddHours}>
				<TaskModal taskId={selectedTask} />
			</Modal>
		</div>
	);
}

export default TasksOverview;
