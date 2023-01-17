import {
	faArrowAltCircleLeft,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components";
import { Modal } from "../components/basic";
import InvoiceOverview from "../components/InvoiceOverview";
import ProjectAddDeveloper from "../components/ProjectAddDeveloper";
import TasksOverview from "../components/TasksOverview";
import { useAuth } from "../hooks/AuthContext";
import useModal from "../hooks/useModal";
import useResource from "../hooks/useResource";
import Invoice from "../types/entities/invoice";
import ProjectFullDetail from "../types/entities/projectFullDetail";

function ProjectPage() {
	const { id } = useParams();

	const navigate = useNavigate();

	const { resource: project, toggleRefresh } = useResource<ProjectFullDetail>(
		"/projects/" + id
	);

	const { resource: invoice } = useResource<Invoice>(
		"/projects/" + id + "/invoice"
	);

	const { hasAccessRights, state } = useAuth();

	const hasAdminAccess = useMemo(
		() => hasAccessRights(["admin"]),
		[state.loggedIn]
	);

	const [show, toggle] = useModal();
	const [showInvoice, toggleInvoice] = useModal();

	return (
		<div className="flex justify-center items-center min-w-max min-h-max">
			<div className="bg-white backdrop-filter max-w-[70vw] min-h-[70vh] flex-auto gap-6 flex flex-col backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg p-10">
				<Button
					className="max-w-fit max-h-fit flex gap-2 justify-center items-center"
					onClick={() => navigate(-1)}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					Go Back
				</Button>
				<div className="flex justify-between">
					<div className="text-white">
						<h1 className="text-4xl mb-1">{project?.projectName}</h1>
						<p>{project?.accountName}</p>
					</div>
					{hasAdminAccess && (
						<Button className="max-w-fit h-fit" onClick={toggleInvoice}>
							See Invoice
						</Button>
					)}
				</div>

				<div className="flex gap-32">
					<div className="text-white flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<h2 className="text-2xl ">Developers</h2>
							<div className="flex flex-col gap-1">
								{project?.developers.map((d) => (
									<div className="px-2" key={d.developerId}>
										{d.accountName}
									</div>
								))}
							</div>
							{hasAdminAccess && (
								<Button onClick={toggle}>Add Developer</Button>
							)}
						</div>
					</div>
					<TasksOverview tasks={project?.tasks} />
				</div>
				{hasAdminAccess && invoice && (
					<Modal show={showInvoice} toggle={toggleInvoice}>
						<InvoiceOverview invoice={invoice} />
					</Modal>
				)}
				{hasAdminAccess && (
					<Modal show={show} toggle={toggle}>
						<ProjectAddDeveloper
							afterSubmit={toggle}
							refreshParent={toggleRefresh}
						/>
					</Modal>
				)}
			</div>
		</div>
	);
}

export default ProjectPage;
