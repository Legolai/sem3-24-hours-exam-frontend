import { useNavigate } from "react-router-dom";
import { Modal } from "../components/basic";
import Button from "../components/basic/Button";
import ProjectsOverview from "../components/ProjectsOverview";
import ProjectsOverviewAdd from "../components/ProjectsOverviewAdd";
import ProjectsOverviewItem from "../components/ProjectsOverviewItem";
import { useAuth } from "../hooks/AuthContext";
import useModal from "../hooks/useModal";
import useProjects from "../hooks/useProjects";

function HomePage() {
	const { state } = useAuth();
	const [show, toggle] = useModal();
	const { projects, toggleRefresh } = useProjects(
		state.roles.includes("developer") ? "/developer/account/" + state.id : ""
	);

	return (
		<div className="flex justify-center">
			<div className=" min-h-max min-w-[50%] m-10 p-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg">
				<div className="mb-6 flex justify-between">
					<h2 className="text-white text-xl flex-grow font-bold ">Projects</h2>
					{state.roles.includes("admin") && (
						<Button onClick={toggle} className="max-w-fit">
							Create Project
						</Button>
					)}
				</div>
				<div className="flex flex-col gap-6">
					{projects.map((p) => (
						<ProjectsOverviewItem key={p.projectId} project={p} />
					))}
				</div>
				{state.roles.includes("admin") && (
					<Modal show={show} toggle={toggle}>
						<ProjectsOverviewAdd
							afterSubmit={toggle}
							refreshParent={toggleRefresh}
						/>
					</Modal>
				)}
			</div>
		</div>
	);
}

export default HomePage;
