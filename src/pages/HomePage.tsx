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
		<div className="flex gap-10 justify-center">
			<div className="text-white min-h-max max-w-[50%] my-10 p-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg">
				<div className="flex flex-col gap-4 justify-start">
					<div>
						<h1 className="text-4xl">Welcome back {state.name}</h1>
						<h2 className="text-2xl font-thin">{state.email}</h2>
					</div>
					<div>
						<h2 className="text-2xl">Permissions:</h2>
						<h3 className="text-xl font-thin ml-4">{state.roles}</h3>
					</div>
				</div>
			</div>
			<div className=" min-h-max min-w-[50%] my-10 p-6 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg">
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
