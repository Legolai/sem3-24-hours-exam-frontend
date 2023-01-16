import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import ExamplePage from "./pages/ExamplePage";
import HomePage from "./pages/HomePage";
import User from "./pages/User";
import { useAuth } from "./hooks/AuthContext";
import BaseLayout from "./layout/BaseLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
	const { autoLogin } = useAuth();

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<BaseLayout>
			<Routes>
				<Route path="/" element={<Header />}>
					<Route index element={<HomePage />} />
					<Route
						path="/persons"
						element={<GuardedRoute allowedRoles={["admin"]} />}
					>
						<Route index element={<User />} />
					</Route>
					<Route path="/example-page" element={<ExamplePage />} />
					<Route path="sign-up" element={<SignUpPage />} />
					<Route path="sign-in" element={<LoginPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BaseLayout>
	);
}

export default App;
