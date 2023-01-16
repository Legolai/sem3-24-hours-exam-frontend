import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../settings";
import facade, { handleHttpErrors } from "../api/apiFacade";
import useForm from "../hooks/useForm";
import useResource from "../hooks/useResource";
import DeveloperMini from "../types/entities/developerMini";
import { Button } from "./basic";

interface ProjectAddDeveloperProps {
	refreshParent: () => void;
	afterSubmit: () => void;
}

function ProjectAddDeveloper({
	refreshParent,
	afterSubmit,
}: ProjectAddDeveloperProps) {
	const { id } = useParams();
	const { resource: devs } = useResource<DeveloperMini[]>(
		"/developers/project/" + id + "/not"
	);

	const ref = useRef<HTMLSelectElement | null>(null);

	return (
		<div className="flex flex-col justify-center items-center gap-2 p-10">
			<h1 className="text-white text-center font-bold text-4xl tracking-wider">
				Add developer(s)
			</h1>
			<div>{}</div>
			<form
				className="w-max h-max flex flex-col justify-center items-center gap-6"
				onSubmit={(event) => {
					event.preventDefault();
					const stringValue = ref.current?.value;
					if (stringValue == undefined) return;
					const value = [Number.parseInt(stringValue)];
					const options = facade.makeOptions("POST", true, value);
					console.log(options);
					fetch(BASE_API_URL + "/projects/" + id + "/developers", options).then(
						(res) => {
							if (res.ok) {
								refreshParent();
								afterSubmit();
							}
						}
					);
				}}
				noValidate
			>
				<select name="devId" ref={ref}>
					{devs?.map((d, i) => (
						<option selected={i == 0} key={d.developerId} value={d.developerId}>
							{d.accountName}
						</option>
					))}
				</select>
				<Button
					type="submit"
					className="font-bold tracking-widest border-opacity-100 mt-5 py-3"
				>
					Add Developer
				</Button>
			</form>
		</div>
	);
}

export default ProjectAddDeveloper;
