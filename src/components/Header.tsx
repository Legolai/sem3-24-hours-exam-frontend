import LoggedIn from "./LoggedIn.jsx";
import NavItem from "./NavItem.js";
import { useAuth } from "../hooks/AuthContext.js";
import Logo from "./Logo.js";
import { faHome, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "./basic/Button.js";

function Header() {
	const { state } = useAuth();
	const navigate = useNavigate();

	return (
		<>
			<nav className="w-full flex h-[50px] justify-end items-center gap-6 px-4">
				<Logo />
				<NavItem route={"/"} icon={faHome} label={"Home"} end />
				<NavItem
					allowedRoles={["admin"]}
					route={"/persons"}
					icon={"users"}
					label={"Persons"}
				/>
				<NavItem route={"/example-page"} icon={faGlobe} label={"Example"} />

				{!state.loggedIn ? (
					<div className="flex gap-6">
						<Button
							onClick={() => navigate("/sign-up")}
							className="w-fit flex-grow-0"
						>
							Sign up
						</Button>
						<Button
							onClick={() => navigate("/sign-in")}
							className="w-fit flex-grow-0"
							outline
						>
							Sign in
						</Button>
					</div>
				) : (
					<></>
				)}
			</nav>
			<Outlet />
		</>
	);
}

export default Header;
