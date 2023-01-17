import facade from "../api/apiFacade";
import Role from "../types/entities/role";

function decodeJwt() {
	const token = facade.getToken();
	if (!token) return undefined;
	const jwtData = token.split(".")[1];
	const decodedJwtJsonData = window.atob(jwtData);
	const decodedJwtData = JSON.parse(decodedJwtJsonData);
	return decodedJwtData;
}

function getEmail(jwt: { email: string }) {
	return jwt && jwt.email;
}

function getName(jwt: { name: string }) {
	return jwt && jwt.name;
}

function getUserRoles(jwt: { roles: string }) {
	if (!jwt || !jwt.roles) return false;
	return jwt.roles.split(",") as Role[];
}

function getUserId(jwt: { id: number }) {
	return jwt && jwt.id;
}

function getUserInfo() {
	const jwtData = decodeJwt();
	return {
		id: getUserId(jwtData),
		email: getEmail(jwtData),
		name: getName(jwtData),
		roles: getUserRoles(jwtData) || [],
	};
}

export { getUserInfo };
