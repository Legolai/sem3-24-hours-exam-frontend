import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import ExamplePage from "./pages/ExamplePage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./hooks/AuthContext";
import BaseLayout from "./layout/BaseLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
	const { autoLogin, state } = useAuth();

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<BaseLayout>
			<Routes>
				<Route path="/" element={<Header />}>
					<Route
						index
						element={!state.loggedIn ? <LoginPage /> : <HomePage />}
					/>
					<Route
						path="/project/:id"
						element={<GuardedRoute allowedRoles={["admin", "developer"]} />}
					>
						<Route index element={<ProjectPage />} />
					</Route>
					<Route path="/example-page" element={<ExamplePage />} />
					<Route path="sign-in" element={<LoginPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BaseLayout>
	);
}

export default App;
