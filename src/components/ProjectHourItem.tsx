import { ChangeEvent, useState } from "react";
import { BASE_API_URL } from "../../settings";
import facade from "../api/apiFacade";
import { useAuth } from "../hooks/AuthContext";
import ProjectHourDev from "../types/entities/projectHourDev";
import { Button, InputField } from "./basic";

interface ProjectHourItemProps {
	projectHour: ProjectHourDev;
	taskId: number;
	removePH: () => void;
}
function ProjectHourItem({
	projectHour,
	taskId,
	removePH,
}: ProjectHourItemProps) {
	const { state } = useAuth();

	const [edit, setEdit] = useState(false);

	const [editable, setEditable] = useState({
		hoursSpendt: projectHour.hoursSpendt,
		description: projectHour.description,
		projectHourId: projectHour.projecthourId,
		accountId: projectHour.accountId,
		taskId: taskId,
	});

	function onChange(event: ChangeEvent<HTMLInputElement>) {
		setEditable((curr) => ({
			...curr,
			[event.target.name]: event.target.value,
		}));
	}

	function doUpdate() {
		const options = facade.makeOptions("PUT", true, {
			hoursSpendt: Number.parseInt(editable.hoursSpendt + ""),
			description: editable.description,
			accountId: editable.accountId,
			taskId: editable.taskId,
		});

		fetch(
			BASE_API_URL + "/developers/project-hours/" + editable.projectHourId,
			options
		).then((res) => {
			if (res.ok) removePH();
		});

		setEdit(false);
	}

	function doDelete() {
		const options = facade.makeOptions("DELETE", true);

		fetch(
			BASE_API_URL + "/developers/project-hours/" + editable.projectHourId,
			options
		);
		setEdit(false);
	}

	return (
		<div className="text-white bg-white backdrop-filter gap-6 items-center flex backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg px-5 py-3">
			<div className="flex gap-2 justify-center items-center">
				#{projectHour.projecthourId} -{" "}
				{edit ? (
					<InputField
						className="max-w-[8rem]"
						name="description"
						onChange={onChange}
						value={editable.description}
					/>
				) : (
					editable.description
				)}
			</div>
			<div className="flex gap-2 justify-center items-center ">
				Hours spent:{" "}
				{edit ? (
					<InputField
						onChange={onChange}
						name={"hoursSpendt"}
						type={"number"}
						className="max-w-[4rem]"
						value={editable.hoursSpendt}
					/>
				) : (
					editable.hoursSpendt
				)}
			</div>
			<div>Dev: {projectHour.accountName}</div>

			{state.id == projectHour.accountId &&
				(!edit ? (
					<Button className="max-w-fit ml-auto" onClick={() => setEdit(true)}>
						Edit
					</Button>
				) : (
					<div className="ml-auto flex gap-2">
						<Button
							className="max-w-fit text-green-500 font-semibold px-3 tracking-wider border-green-500"
							outline
							onClick={doUpdate}
						>
							Save
						</Button>
						<Button
							className="max-w-fit text-red-400 font-semibold px-3 tracking-wider border-red-400"
							outline
							onClick={doDelete}
						>
							Delete
						</Button>
					</div>
				))}
		</div>
	);
}

export default ProjectHourItem;
