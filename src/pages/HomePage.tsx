import { useNavigate } from "react-router-dom";
import Button from "../components/basic/Button";

function HomePage() {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center">
			<header className="mt-20 flex flex-col h-fit justify-start gap-5">
				<div className="">
					<h1 className="font-bold text-2xl text-white">Welcome</h1>
					<p className="text-gray-300">Take your idea to the next level</p>
				</div>
				<Button
					className="py-2 px-6 w-fit"
					onClick={() => navigate("/sign-up")}
				>
					Start now!
				</Button>
			</header>
		</div>
	);
}

export default HomePage;
