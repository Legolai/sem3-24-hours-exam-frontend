import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.js";
import Button from "./basic/Button.js";

function LoggedIn() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const onLogout = useCallback(() => {
		logout();
		navigate("/");
	}, []);

	return (
		<div>
			<Button onClick={onLogout}>Log Out</Button>
		</div>
	);
}

export default LoggedIn;
