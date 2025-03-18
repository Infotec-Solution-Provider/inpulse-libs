import type { Router } from "express";
import Logger from "./logger";

/**
 * Retorna os endpoints definidos em um router formatados como strings.
 *
 * @param path - O caminho base a ser acrescentado aos caminhos de cada rota.
 * @param router - A instância do router Express contendo as definições de rota.
 * @returns Um array de strings contendo os métodos HTTP e os caminhos dos endpoints do router.
 *
 * @example
 * ```typescript
 * const router = express.Router();
 * router.get('/exemplo', (req, res) => res.send('Exemplo'));
 * 
 * const endpoints = getRouterEndpoints('/api', router);
 * console.log(endpoints); // Retorno: ["GET    /api/example"]
 * ```
 */
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

/**
 * Imprime no console as rotas dos routers providenciados usando o {@link Logger}.
 *
 * @param basePath - O caminho base a ser acrescentado ao caminho de cada rota.
 * @param routers - Um array das instancias Router que terão seus endpoints impressos no console.
 * 
 * Essa função itera pelos routers providenciados, retorna seus endpoints usando a função {@link getRouterEndpoints()} e imprime cada rota usando o método {@link Logger.info()}.
 */
function logRoutes(basePath: string, routers: Router[]) {
	routers.forEach((router) => {
		const endpoints = getRouterEndpoints(basePath, router);
		endpoints.forEach((route) => {
			Logger.info(`(ROUTE) ${route}`);
		});
	});
}

export default logRoutes;