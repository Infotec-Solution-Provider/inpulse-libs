import { AxiosInstance } from "axios";
import { QueryResponse } from "./response";

/**
 * Classe InstanceSDK para interagir com a API de instâncias.
 */
class InstanceSDK {
	/**
	 * Cria uma instância do SDK de instância.
	 * @param {AxiosInstance} httpClient A instância do cliente HTTP a ser usada para fazer requisições à API.
	 */
	constructor(private readonly httpClient: AxiosInstance) { }

	/**
	 * Executa uma consulta na instância especificada.
	 * @param {string} instanceName Nome da instância do Inpulse.
	 * @param {string} query Consulta a ser executada.
	 * @param {any[]} parameters Parâmetros da consulta.
	 * @returns {Promise<T>} Resultado da consulta.
	 */
	public async executeQuery<T>(
		instanceName: string,
		query: string,
		parameters: any[],
	): Promise<T> {
		const response = await this.httpClient
			.post<QueryResponse<T>>(`/${instanceName}/query`, { query, parameters })
			.catch((error) => {
				if (error.response?.data?.message) {
					throw new Error(error.response.data.message);
				}
				if (error.response?.status) {
					throw new Error(
						`Failed to execute query, status: ${error.response.status}`,
					);
				}
				throw new Error(error.message);
			});

		return response.data.result;
	}
}

export default InstanceSDK;
