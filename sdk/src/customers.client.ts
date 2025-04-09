import ApiClient from "./api-client";
import { CreateCustomerDTO, UpdateCustomerDTO } from "./types/customers.types";

class CustomersClient extends ApiClient {
    /**
     * Cria um novo cliente.
     * @param data - Os dados do cliente a serem criados.
     * @returns Uma Promise que resolve para o cliente criado.
     */
    public async createCustomer(data: CreateCustomerDTO) {
        const response = await this.httpClient.post(`/customers`, data);

        return response.data;
    }

    /**
     * Obtém um cliente pelo ID.
     * @param customerId - O ID do cliente a ser obtido.
     * @returns Uma Promise que resolve para o cliente obtido.
     */
    public async getCustomerById(customerId: number) {
        const response = await this.httpClient.get(`/customers/${customerId}`);
        return response.data;
    }

    /**
     * Atualiza um cliente existente.
     * @param customerId - O ID do cliente a ser atualizado.
     * @param data - Os dados atualizados do cliente.
     * @returns Uma Promise que resolve para o cliente atualizado.
     */
    public async updateCustomer(customerId: number, data: UpdateCustomerDTO) {
        const response = await this.httpClient.patch(`/customers/${customerId}`, data);
        return response.data;
    }

    /**
     * Obtém todos os clientes.
     * 
     * @param filters - Filtros opcionais para a busca de clientes.
     * @todo Implementar tipagem para os filtros.
     * @returns Uma Promise que resolve para uma lista de clientes.
     */
    public async getAllCustomers(filters: Record<string, string>) {
        let baseUrl = `/customers`;
        const params = new URLSearchParams(filters);

        if (params.toString()) {
            baseUrl += `?${params.toString()}`;
        }

        const response = await this.httpClient.get(`/customers`);

        return response.data;
    }

    /**
     * Define o token de autenticação para as requisições.
     * @param token - O token de autenticação a ser definido.
     */
    public setAuth(token: string) {
        this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}

export default CustomersClient;