import { useNavigate } from "react-router-dom";
import Button from "../components/basic/Button";
import ProjectsOverview from "../components/ProjectsOverview";
import { useAuth } from "../hooks/AuthContext";

function HomePage() {
	const { state } = useAuth();

	return (
		<div className="flex justify-center">
			{state.roles.includes("admin") && <ProjectsOverview />}
		</div>
	);
}

export default HomePage;
