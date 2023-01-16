import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../settings";
import facade, { handleHttpErrors } from "../api/apiFacade";
import { Button } from "../components";
import { Modal } from "../components/basic";
import ProjectAddDeveloper from "../components/ProjectAddDeveloper";
import TasksOverview from "../components/TasksOverview";
import { useAuth } from "../hooks/AuthContext";
import useModal from "../hooks/useModal";
import useResource from "../hooks/useResource";
import ProjectFullDetail from "../types/entities/projectFullDetail";

function ProjectPage() {
	const { id } = useParams();

	const { resource: project, toggleRefresh } = useResource<ProjectFullDetail>(
		"/projects/" + id
	);

	const { hasAccessRights } = useAuth();

	const [show, toggle] = useModal();

	return (
		<div className="bg-white backdrop-filter items-center flex backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg p-5">
			<div>
				<h1>{project?.projectName}</h1>
				<h2>Owner</h2>
				<p>{project?.accountName}</p>
				<h2>Developers</h2>
				<div>
					{project?.developers.map((d) => (
						<div key={d.developerId}>{d.accountName}</div>
					))}
				</div>
				{hasAccessRights(["admin"]) && (
					<Button onClick={toggle}>Add Developer</Button>
				)}
			</div>
			<TasksOverview tasks={project?.tasks} />
			{hasAccessRights(["admin"]) && (
				<Modal show={show} toggle={toggle}>
					<ProjectAddDeveloper
						afterSubmit={toggle}
						refreshParent={toggleRefresh}
					/>
				</Modal>
			)}
		</div>
	);
}

export default ProjectPage;
