import { inject } from "@angular/core";
import { CanActivateFn, CanActivateChildFn, Router } from "@angular/router";

export const loginGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);

	const accessToken = localStorage.getItem("accessToken");
	const userJson = localStorage.getItem("user");
	const expectedRoles: string[] = route.data?.["roles"] || [];

	// Sin token o sin usuario
	if (!accessToken || !userJson) {
		router.navigate(["/login"]);
		return false;
	}
	const user = JSON.parse(userJson);
	const userRole = user?.rol || "";

	// Verificar roles
	if (expectedRoles.length > 0 && !expectedRoles.includes(userRole)) {
		router.navigate(["/login"]);
		return false;
	}

	return true;
};

export const loginGuardChild: CanActivateChildFn = loginGuard;
