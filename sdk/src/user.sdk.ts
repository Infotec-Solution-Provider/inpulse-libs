import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import type {
	DataResponse,
	PaginatedResponse,
	User,
	CreateUserDTO,
	UpdateUserDTO,
} from "@in.pulse-crm/types";

/**
 * Classe UserSDK para interagir com a API de usuários.
 */
class UserSDK {
	/**
	 * Cria uma instância do SDK de usuário.
	 * 
	 * @param httpClient - A instância do cliente HTTP a ser usada para fazer requisições à API.
	 */
	constructor(private readonly httpClient: AxiosInstance) { }

	/**
	 * Obtém uma lista paginada de usuários.
	 * @param instanceId - O ID da instância.
	 * @returns Uma promessa que resolve para uma resposta paginada de usuários.
	 */
	public async fetchUsers(instanceId: string): Promise<PaginatedResponse<User>> {
		const response = await this.httpClient.get<PaginatedResponse<User>>(
			`/${instanceId}/users`,
		);

		return response.data;
	}

	/**
	 * Obtém um usuário pelo ID.
	 * @param instanceId - O ID da instância.
	 * @param userId - O ID do usuário.
	 * @returns Uma promessa que resolve para uma resposta de dados do usuário.
	 */
	public async fetchUserById(instanceId: string, userId: number): Promise<DataResponse<User>> {
		const response = await this.httpClient.get<DataResponse<User>>(
			`/${instanceId}/users/${userId}`,
		);

		return response.data;
	}

	/**
	 * Cria um novo usuário.
	 * @param instanceId - O ID da instância.
	 * @param userData - Os dados do usuário a serem criados.
	 * @returns Uma promessa que resolve para uma resposta de dados do usuário criado.
	 * @throws Um erro se a criação do usuário falhar.
	 */
	public async createUser(instanceId: string, userData: CreateUserDTO): Promise<DataResponse<User>> {
		try {
			const response = await this.httpClient.post<DataResponse<User>>(
				`/${instanceId}/users`,
				userData,
			);

			return response.data;
		} catch (error) {
			throw new Error("Failed to create user", { cause: error });
		}
	}

	/**
	 * Atualiza um usuário existente.
	 * @param instanceId - O ID da instância.
	 * @param userId - O ID do usuário.
	 * @param userData - Os dados do usuário a serem atualizados.
	 * @returns Uma promessa que resolve para uma resposta de dados do usuário atualizado.
	 * @throws Um erro se a atualização do usuário falhar.
	 */
	public async updateUser(instanceId: string, userId: string, userData: UpdateUserDTO): Promise<DataResponse<User>> {
		try {
			const response = await this.httpClient.patch<DataResponse<User>>(
				`/${instanceId}/users/${userId}`,
				userData,
			);

			return response.data;
		} catch (error) {
			throw new Error("Failed to update user", { cause: error });
		}
	}
}

export default UserSDK;
