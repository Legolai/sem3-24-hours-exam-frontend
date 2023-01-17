import DeveloperMini from "./developerMini";
import TaskMini from "./taskMini";

interface ProjectFullDetail {
	projectId: number;
	projectName: string;
	projectDescription: string;
	projectCreatedAt: Date;
	projectUpdatedAt: Date;
	accountId: number;
	accountName: string;
	developers: DeveloperMini[];
	tasks: TaskMini[];
}

export default ProjectFullDetail;
