import Project from "../types/entities/project";

interface ProjectsOverviewItemProps {
	project: Project;
}

function ProjectsOverviewItem({ project }: ProjectsOverviewItemProps) {
	return (
		<div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg p-5">
			<h3 className="text-white font-bold text-lg">{project.projectName}</h3>
			<p className="text-white">{project.projectDescription}</p>
		</div>
	);
}

export default ProjectsOverviewItem;
