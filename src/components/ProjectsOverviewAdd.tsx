import { assert } from "console";
import { BASE_API_URL } from "../../settings";
import facade, { handleHttpErrors } from "../api/apiFacade";
import { useAuth } from "../hooks/AuthContext";
import useForm from "../hooks/useForm";
import { Button, InputField } from "./basic";
interface ProjectsOverviewAddProps {
	refreshParent: () => void;
	afterSubmit: () => void;
}

function ProjectsOverviewAdd({
	refreshParent,
	afterSubmit,
}: ProjectsOverviewAddProps) {
	const { state } = useAuth();

	const { handleSubmit, register, isSubmitting } = useForm({
		projectName: "",
		projectDescription: "",
		accountId: state.id,
	});

	return (
		<div className="flex flex-col justify-center items-center gap-2 p-10">
			<h1 className="text-white text-center font-bold text-4xl tracking-wider">
				Create Project
			</h1>
			<div>{}</div>
			<form
				className="w-max h-max flex flex-col justify-center items-center gap-6"
				onSubmit={handleSubmit((event, values) => {
					const options = facade.makeOptions("POST", true, values);
					fetch(BASE_API_URL + "/projects", options)
						.then(handleHttpErrors)
						.then((_) => {
							refreshParent();
							afterSubmit();
						});
				})}
				noValidate
			>
				<InputField
					hidden
					type={"number"}
					{...register("accountId", [], true)}
				/>
				<InputField
					label="Project name"
					type={"text"}
					{...register("projectName", [], true)}
				/>
				<InputField
					type={"text"}
					label="Project description"
					{...register("projectDescription", [], true)}
				/>
				<Button
					disabled={isSubmitting}
					type="submit"
					className="font-bold tracking-widest border-opacity-100 mt-5 py-3"
				>
					Create Project
				</Button>
			</form>
		</div>
	);
}

export default ProjectsOverviewAdd;
