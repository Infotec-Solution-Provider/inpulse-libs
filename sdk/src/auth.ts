import { AxiosInstance } from "axios";
import { User } from "./user";
import { sanitizeErrorMessage } from "@in.pulse-crm/utils";
import { DataResponse } from "./response";

export interface LoginData {
    /**
     * Token de autenticação.
     */
    token: string;
    /**
     * Dados do usuário.
     */
    user: User;
}

export interface SessionData {
    /**
     * ID do usuário.
     */
    userId: number;
    /**
     * ID do setor do usuário.
     */
    sectorId: number
    /**
     * Papel do usuário.
     */
    role: string;
    /**
     * Nome da instância.
     */
    instance: string;
}

/**
 * Classe AuthSDK para interagir com a API de autenticação.
 */
export default class AuthSDK {

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
     * @param {string} authToken Token de autenticação.
     * @returns {Promise<DataResponse<AuthTypes.SessionData>>} Dados da sessão.
     */
    public async fetchSessionData(authToken: string): Promise<DataResponse<SessionData>> {
        const response = await this.httpClient
            .get<DataResponse<SessionData>>(`/auth`, {
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
     * @param {string} authToken Token de autenticação.
     * @returns {Promise<DataResponse<AuthTypes.User>>} Dados do usuário.
     */
    public async fetchSessionUser(authToken: string): Promise<DataResponse<User>> {
        const response = await this.httpClient
            .get<DataResponse<User>>(`/auth/user`, {
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

            return authorizedRoles.includes(data.role) && data.instance === instanceName;
        } catch {
            return false;
        }
    }
}
