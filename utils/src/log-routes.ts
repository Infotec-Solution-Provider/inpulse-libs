import type { Router } from "express";
import Logger from "./logger";

function getRouterEndpoints(path: string, router: Router) {
	const endpoints = new Array<string>();

	if (router && router.stack) {
		router.stack.forEach((layer) => {
			if (layer.route) {
				const subPath = layer.route.path;
				const methods = Object.keys((layer.route as any).methods);

				methods.forEach((method) => {
					endpoints.push(
						`${method
							.toUpperCase()
							.padEnd(6, " ")} ${path}${subPath}`
					);
				});
			}
		});
	}

	return endpoints;
}

function logRoutes(basePath: string, routers: Router[]) {
	routers.forEach((router) => {
		const endpoints = getRouterEndpoints(basePath, router);
		endpoints.forEach((route) => {
			Logger.info(`(ROUTE) ${route}`);
		});
	});
}

export default logRoutes;