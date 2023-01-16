import { useCallback, useEffect, useState } from "react";
import { BASE_API_URL } from "../../settings";
import facade, { handleHttpErrors } from "../api/apiFacade";
import { useAuth } from "../hooks/AuthContext";
import useModal from "../hooks/useModal";
import useProjects from "../hooks/useProjects";
import Project from "../types/entities/project";
import { Button, Modal } from "./basic";
import ProjectsOverviewAdd from "./ProjectsOverviewAdd";
import ProjectsOverviewItem from "./ProjectsOverviewItem";

function ProjectsOverview() {
	const [show, toggle] = useModal();
	const { projects, toggleRefresh } = useProjects();

	return (
		<div className=" min-h-max min-w-[50%] m-10 p-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg">
			<div className="mb-6 flex justify-between">
				<h2 className="text-white text-xl flex-grow font-bold ">Projects</h2>
				<Button onClick={toggle} className="max-w-fit">
					Create Project
				</Button>
			</div>
			<div className="flex flex-col gap-6">
				{projects.map((p) => (
					<ProjectsOverviewItem key={p.projectId} project={p} />
				))}
			</div>
			<Modal show={show} toggle={toggle}>
				<ProjectsOverviewAdd
					afterSubmit={toggle}
					refreshParent={toggleRefresh}
				/>
			</Modal>
		</div>
	);
}

export default ProjectsOverview;
