import { useCallback, useEffect, useState } from "react";
import { BASE_API_URL } from "../../settings";
import facade, { handleHttpErrors } from "../api/apiFacade";
import Project from "../types/entities/project";

function useProjects(filter?: string) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [refresh, setRefresh] = useState(false);

	const toggleRefresh = useCallback(() => setRefresh((curr) => !curr), []);

	useEffect(() => {
		const controller = new AbortController();
		const getData = async () => {
			const options = facade.makeOptions("GET", true);
			const res = await fetch(BASE_API_URL + "/projects" + filter, {
				...options,
				signal: controller.signal,
			});
			const data = await handleHttpErrors(res);

			setProjects(data as Project[]);
		};
		getData();
		return () => controller.abort();
	}, [refresh]);

	return {
		projects,
		toggleRefresh,
	};
}

export default useProjects;
