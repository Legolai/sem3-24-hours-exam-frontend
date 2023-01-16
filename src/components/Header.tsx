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
				<NavItem
					allowedRoles={["admin", "developer"]}
					route={"/"}
					icon={faHome}
					label={"Home"}
					end
				/>
				<NavItem
					allowedRoles={["admin"]}
					route={"/persons"}
					icon={"users"}
					label={"Persons"}
				/>

				{state.loggedIn && <LoggedIn />}
			</nav>
			<Outlet />
		</>
	);
}

export default Header;
