import { sanitizeErrorMessage } from "@in.pulse-crm/utils";
import { DataResponse } from "./types/response.types";
import ApiClient from "./api-client";
import { LoginData, SessionData } from "./types/auth.types";

/**
 * Classe AuthSDK para interagir com a API de autenticação.
 */
export default class AuthClient extends ApiClient {
	/**
	 * Realiza o login do usuário.
	 * @param {string} instance Nome da instância do Inpulse.
	 * @param {string} username Nome de usuário.
	 * @param {string} password Senha do usuário.
	 * @returns {Promise<DataResponse<LoginData>>} Dados de login.
	 */
	public async login(
		instance: string,
		username: string,
		password: string,
	): Promise<DataResponse<LoginData>> {
		const response = await this.httpClient.post<DataResponse<LoginData>>(
			`/api/auth/login`,
			{ LOGIN: username, SENHA: password, instance },
		);

		return response.data;
	}

	/**
	 * Busca os dados da sessão.
	 * @param {string} authToken Token de autenticação.
	 * @returns {Promise<DataResponse<AuthTypes.SessionData>>} Dados da sessão.
	 */
	public async fetchSessionData(
		authToken: string,
	): Promise<DataResponse<SessionData>> {
		const response = await this.httpClient
			.get<DataResponse<SessionData>>(`/api/auth/session`, {
				headers: {
					authorization: authToken,
				},
			})
			.catch((error) => {
				const message = sanitizeErrorMessage(error);
				throw new Error("Failed to fetch session data! " + message);
			});

		return response.data;
	}

	/**
	 * Verifica se o usuário está autenticado.
	 * @param {string} instanceName Nome da instância do Inpulse.
	 * @param {string} authToken Token de autenticação.
	 * @returns {Promise<boolean>} Verdadeiro se o usuário estiver autenticado, falso caso contrário.
	 */
	public async isAuthenticated(
		instanceName: string,
		authToken: string,
	): Promise<boolean> {
		try {
			const { data } = await this.fetchSessionData(authToken);

			return !!data.userId && data.instance === instanceName;
		} catch {
			return false;
		}
	}

	/**
	 * Verifica se o usuário está autorizado.
	 * @param {string} instanceName Nome da instância do Inpulse.
	 * @param {string} authToken Token de autenticação.
	 * @param {string[]} authorizedRoles Lista de papéis autorizados.
	 * @returns {Promise<boolean>} Verdadeiro se o usuário estiver autorizado, falso caso contrário.
	 */
	public async isAuthorized(
		instanceName: string,
		authToken: string,
		authorizedRoles: string[],
	): Promise<boolean> {
		try {
			const { data } = await this.fetchSessionData(authToken);

			return (
				authorizedRoles.includes(data.role) &&
				data.instance === instanceName
			);
		} catch {
			return false;
		}
	}

	public async initOnlineSession(authToken: string) {
		await this.httpClient.post(
			"/api/online-sessions",
			{},
			{
				headers: {
					Authorization: authToken,
				},
			},
		);
	}

    public async finishOnlineSession(authToken: string) {
        await this.httpClient.delete("/api/online-sessions", {
            headers: {
                Authorization: authToken,
            },
        });
    }
}
