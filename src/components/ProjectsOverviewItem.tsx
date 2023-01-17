import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import Project from "../types/entities/project";
import { Button } from "./basic";

interface ProjectsOverviewItemProps {
	project: Project;
}

function ProjectsOverviewItem({ project }: ProjectsOverviewItemProps) {
	return (
		<div className="bg-white backdrop-filter justify-between items-center flex backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg p-5">
			<div>
				<h3 className="text-white font-bold text-lg">{project.projectName}</h3>
				<p className="text-white">{project.projectDescription}</p>
			</div>
			<Link to={"/project/" + project.projectId}>
				<Button outline>Go to Project</Button>
			</Link>
		</div>
	);
}

export default ProjectsOverviewItem;
