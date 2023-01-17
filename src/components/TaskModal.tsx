import { BASE_API_URL } from "../../settings";
import facade from "../api/apiFacade";
import { useAuth } from "../hooks/AuthContext";
import useForm from "../hooks/useForm";
import TaskFullDetailed from "../types/entities/taskFullDetailed";
import { Button, InputField } from "./basic";
import ProjectHourItem from "./ProjectHourItem";
import TaskItem from "./TaskItem";

interface TaskModalProps {
	task: TaskFullDetailed;
	toggleRefresh: () => void;
}

function TaskModal({ task, toggleRefresh }: TaskModalProps) {
	const { hasAccessRights, state } = useAuth();
	const { handleSubmit, register, isSubmitting } = useForm({
		hoursSpent: 0,
		description: "",
	});

	return (
		<div>
			<h1 className="text-4xl font-bold mb-4 text-white">
				#{task.taskId} - {task.taskTitle}
			</h1>

			<h2 className="text-2xl mb-6 text-white">{task.taskDescription}</h2>
			<div className="flex flex-col gap-2 mb-6">
				<h1 className="text-white font-bold text-3xl mb-6 tracking-wider">
					Time Tracker
				</h1>
				<div className="flex flex-col overflow-y-auto max-h-40 gap-4">
					{task.projectHours.map((ph) => (
						<ProjectHourItem
							key={ph.projecthourId}
							taskId={task.taskId}
							removePH={() => toggleRefresh()}
							projectHour={ph}
						/>
					))}
				</div>
				{hasAccessRights(["developer"]) && (
					<>
						<div>{}</div>
						<form
							className="w-max h-max flex justify-center items-end gap-6"
							onSubmit={handleSubmit((event, values) => {
								if (!task) return;
								const data = {
									...values,
									accountId: state.id,
									taskId: task.taskId,
								};
								const options = facade.makeOptions("POST", true, data);
								fetch(BASE_API_URL + "/developers/project-hours", options).then(
									(res) => {
										if (res.ok) toggleRefresh();
									}
								);
							})}
							noValidate
						>
							<InputField
								label="Hours spent"
								type={"number"}
								{...register("hoursSpent", [], true)}
							/>
							<InputField
								type={"text"}
								label="Description"
								{...register("description", [], true)}
							/>
							<Button
								disabled={isSubmitting}
								type="submit"
								className="font-bold w-fit tracking-widest border-opacity-100 mt-5 py-3"
							>
								Add Time Tracker
							</Button>
						</form>
					</>
				)}
			</div>
			<h3 className="text-2xl mb-4">Tasks</h3>
			<div>
				{task.subtasks.length != 0 ? (
					task.subtasks.map((sb) => (
						<TaskItem select={() => {}} key={sb.taskId} task={task} />
					))
				) : (
					<div className="bg-white backdrop-filter px-4 py-2 backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg">
						There now subtasks
					</div>
				)}
			</div>
		</div>
	);
}

export default TaskModal;
