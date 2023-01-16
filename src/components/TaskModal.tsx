import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../settings";
import facade, { handleHttpErrors } from "../api/apiFacade";
import { useAuth } from "../hooks/AuthContext";
import useForm from "../hooks/useForm";
import TaskFullDetailed from "../types/entities/taskFullDetailed";
import { Button, InputField } from "./basic";

interface TaskModalProps {
	taskId: number;
}

function TaskModal({ taskId }: TaskModalProps) {
	// const [task, setTask] = useState<TaskFullDetailed>();
	const { hasAccessRights, state } = useAuth();

	const { register, handleSubmit } = useForm({
		hoursSpent: 0,
		description: "",
		taskId: taskId,
		AccountId: state.id,
	});

	// useEffect(() => {
	// 	const controller = new AbortController();
	// 	const getData = async () => {
	// 		const options = facade.makeOptions("GET", true);
	// 		const res = await fetch(BASE_API_URL + "/tasks/" + taskId, {
	// 			...options,
	// 			signal: controller.signal,
	// 		});
	// 		const data = await handleHttpErrors(res);
	// 		console.log(data);
	// 		setTask(data as TaskFullDetailed);
	// 	};
	// 	if (taskId && taskId != 0) getData();
	// 	return () => controller.abort();
	// }, [taskId]);

	return (
		<div>
			<h1 className="text-4xl text-white">Task {taskId}</h1>
			{hasAccessRights(["developer"]) && (
				<>
					<h3>Time Tracker</h3>
					<form
						noValidate
						onSubmit={handleSubmit((event, values) => {
							const options = facade.makeOptions("POST", true, values);
							console.log(options);
							// fetch(BASE_API_URL + "/developers/project-hours", options);
						})}
					>
						<InputField
							label="Hours spent"
							type={"number"}
							{...register("hoursSpent", [], true)}
						/>
						<InputField
							label="Description"
							type={"text"}
							{...register("description", [], true)}
						/>

						<Button type="submit">Add time tracker</Button>
					</form>
				</>
			)}
		</div>
	);
}

export default TaskModal;
