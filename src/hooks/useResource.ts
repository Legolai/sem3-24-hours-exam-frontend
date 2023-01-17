import { useCallback, useEffect, useState } from "react";
import { BASE_API_URL } from "../../settings";
import facade, { handleHttpErrors } from "../api/apiFacade";

function useResource<T>(path: string) {
	const [resource, setResource] = useState<T>();
	const [refresh, setRefresh] = useState(false);

	const toggleRefresh = useCallback(
		() => setRefresh((curr) => !curr),
		[resource]
	);

	useEffect(() => {
		const controller = new AbortController();
		const getData = async () => {
			const options = facade.makeOptions("GET", true);
			const res = await fetch(BASE_API_URL + path, {
				...options,
				signal: controller.signal,
			});
			const data = await handleHttpErrors(res);
			console.log(data);
			setResource(data as T);
		};
		getData();
		return () => controller.abort();
	}, [refresh]);

	return {
		resource,
		toggleRefresh,
	};
}

export default useResource;
