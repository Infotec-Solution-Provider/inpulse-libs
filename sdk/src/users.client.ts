import { DataResponse, PaginatedResponse } from "./types/response.types";
import { CreateUserDTO, UpdateUserDTO, User } from "./types/user.types";
import ApiClient from "./api-client";

/**
 * SDK para operações de usuários.
 */
export default class UsersClient extends ApiClient {
    /**
     * Obtém a lista de usuários.
     * @returns Uma resposta paginada contendo os usuários.
     */
    public async getUsers() {
        const response = await this.httpClient.get<PaginatedResponse<User>>(`/users`);

        return response.data;
    }

    /**
     * Obtém um usuário pelo ID.
     * @param userId - O ID do usuário.
     * @returns Uma resposta contendo os dados do usuário.
     */
    public async getUserById(userId: number) {
        const response = await this.httpClient.get<DataResponse<User>>(`/users/${userId}`);

        return response.data;
    }

    /**
     * Cria um novo usuário.
     * @param data - Os dados para criação do usuário.
     * @returns Uma resposta contendo os dados do usuário criado.
     * @throws Um erro se a criação do usuário falhar.
     */
    public async createUser(data: CreateUserDTO) {
        try {
            const response = await this.httpClient.post<DataResponse<User>>(`/users`, data);

            return response.data;
        } catch (error) {
            throw new Error("Failed to create user", { cause: error });
        }
    }

    /**
     * Atualiza um usuário existente.
     * @param userId - O ID do usuário.
     * @param data - Os dados para atualização do usuário.
     * @returns Uma resposta contendo os dados do usuário atualizado.
     * @throws Um erro se a atualização do usuário falhar.
     */
    public async updateUser(userId: string, data: UpdateUserDTO) {
        try {
            const response = await this.httpClient.patch<DataResponse<User>>(
                `/users/${userId}`,
                data,
            );

            return response.data;
        } catch (error) {
            throw new Error("Failed to update user", { cause: error });
        }
    }

    /**
     * Sets the authorization token for HTTP requests.
     *
     * @param token - The authentication token to be used in the `Authorization` header.
     */
    public setAuth(token: string) {
        this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}
