import { useCallback, useState } from "react";

function useModal(defaultValue = false) {
	const [show, setShow] = useState(defaultValue ?? false);

	const toggle = useCallback(() => setShow((curr) => !curr), []);

	return [show, toggle] as const;
}

export default useModal;
