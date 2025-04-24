import ApiClient from "./api-client";
import { RequestFilters, WppSchedule } from "./types";
import {} from "./types/customers.types";

/**
 * Cliente para interação com a API de agendamento de clientes do WhatsApp.
 * Extende a classe ApiClient para fornecer métodos específicos para operações relacionadas a clientes.
 */
class WhatsappSchedules extends ApiClient {
	/**
	 * Obtém os detalhes de um agendamento.
	 * @param filters - keys de WppSchedule.
	 * @param userId/sectorId filtrar por usúario/setor
	 * @returns Uma Promise que resolve para um array de objetos wppSchedule.
	 */
	public async getWppSchedules(
		userId?: string,
		sectorId?: string,
		filters?: RequestFilters<WppSchedule>,
	) {
		let baseUrl = `/api/whatsapp/schedules`;
		const params = new URLSearchParams(filters);

		if (params.toString()) {
			if (userId && sectorId) {
				baseUrl += `?userId=${userId}&sectorId=${sectorId}&${params.toString()}`;
			} else if (userId) {
				baseUrl += `?userId=${userId}&${params.toString()}`;
			} else if (sectorId) {
				baseUrl += `?sectorId=${sectorId}&${params.toString()}`;
			} else {
				baseUrl += `?${params.toString()}`;
			}
		} else if (userId || sectorId) {
			if (userId && sectorId) {
				baseUrl += `?userId=${userId}&sectorId=${sectorId}`;
			} else if (userId) {
				baseUrl += `?userId=${userId}`;
			} else if (sectorId) {
				baseUrl += `?sectorId=${sectorId}`;
			}
		}

		const response = await this.httpClient.get(baseUrl);
		return response.data;
	}

	/**
	 * Cria um novo agendamento.
	 * @param scheduleData - Os dados do agendamento, keys de wppSchedule.
	 * @returns Uma Promise que resolve para um objeto wppSchedule.
	 */
	public async createWppSchedules(scheduleData: Record<string, any>) {
		const response = await this.httpClient.post(
			`/api/whatsapp/schedules`,
			scheduleData,
		);
		return response.data;
	}

	/**
	 * Edita um agendamento existente.
	 * @param scheduleId - O ID do agendamento a ser editado.
	 * @param updatedData - Os dados atualizados do agendamento.
	 * @returns Uma Promise que resolve para um objeto wppSchedule.
	 */
	public async editWppSchedules(
		scheduleId: number,
		updatedData: Record<string, WppSchedule>,
	) {
		const response = await this.httpClient.patch(
			`/api/whatsapp/schedules/${scheduleId}`,
			updatedData,
		);
		return response.data;
	}

	/**
	 * Exclui um agendamento.
	 * @param scheduleId - O ID do agendamento a ser excluído.
	 * @returns Uma Promise que resolve para um objeto wppSchedule.
	 */
	public async deleteWppSchedules(scheduleId: number) {
		const response = await this.httpClient.delete(
			`/api/whatsapp/schedules/${scheduleId}`,
		);
		return response.data;
	}

	/**
	 * Define o token de autenticação para as requisições.
	 * @param token - O token de autenticação a ser definido.
	 */
	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}

export default WhatsappSchedules;
