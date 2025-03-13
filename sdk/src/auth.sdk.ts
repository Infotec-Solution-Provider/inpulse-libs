import { AxiosInstance } from "axios";
import { DataResponse, LoginData, SessionData, User } from "@in.pulse-crm/types";
import { sanitizeErrorMessage } from "@in.pulse-crm/utils";

/**
 * Classe AuthSDK para interagir com a API de autenticação.
 */
class AuthSDK {

	/**
	 * Cria uma instância do SDK de autenticação.
	 * @param {AxiosInstance} httpClient A instância do cliente HTTP a ser usada para fazer requisições à API.
	 */
	constructor(private readonly httpClient: AxiosInstance) {

	}

	/**
	 * Realiza o login do usuário.
	 * @param {string} instanceName Nome da instância do Inpulse.
	 * @param {string} username Nome de usuário.
	 * @param {string} password Senha do usuário.
	 * @returns {Promise<DataResponse<LoginData>>} Dados de login.
	 */
	public async login(instanceName: string, username: string, password: string): Promise<DataResponse<LoginData>> {
		const response = await this.httpClient.post<DataResponse<LoginData>>(
			`${instanceName}/login`,
			{ LOGIN: username, SENHA: password },
		);

		return response.data;
	}

	/**
	 * Busca os dados da sessão.
	 * @param {string} instanceName Nome da instância do Inpulse.
	 * @param {string} authToken Token de autenticação.
	 * @returns {Promise<DataResponse<SessionData>>} Dados da sessão.
	 */
	public async fetchSessionData(instanceName: string, authToken: string): Promise<DataResponse<SessionData>> {
		const response = await this.httpClient
			.get<DataResponse<SessionData>>(`/${instanceName}/auth`, {
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
	 * Busca os dados do usuário da sessão.
	 * @param {string} instanceName Nome da instância do Inpulse.
	 * @param {string} authToken Token de autenticação.
	 * @returns {Promise<DataResponse<User>>} Dados do usuário.
	 */
	public async fetchSessionUser(instanceName: string, authToken: string): Promise<DataResponse<User>> {
		const response = await this.httpClient
			.get<DataResponse<User>>(`/${instanceName}/auth/user`, {
				headers: {
					authorization: authToken,
				},
			})
			.catch((error) => {
				const message = sanitizeErrorMessage(error);
				throw new Error("Failed to fetch session user! " + message);
			});

		return response.data;
	}

	/**
	 * Verifica se o usuário está autenticado.
	 * @param {string} instanceName Nome da instância do Inpulse.
	 * @param {string} authToken Token de autenticação.
	 * @returns {Promise<boolean>} Verdadeiro se o usuário estiver autenticado, falso caso contrário.
	 */
	public async isAuthenticated(instanceName: string, authToken: string): Promise<boolean> {
		try {
			const { data } = await this.fetchSessionData(instanceName, authToken);

			return !!data.userId;
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
			const { data } = await this.fetchSessionData(instanceName, authToken);

			return authorizedRoles.includes(data.role);
		} catch {
			return false;
		}
	}
}

export default AuthSDK;
