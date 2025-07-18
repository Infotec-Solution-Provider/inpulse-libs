import ApiClient from "./api-client";
import { RequestFilters } from "./types";
import { DataResponse, MessageResponse } from "./types/response.types";
import {
	CreateScheduleDTO,
	SendMessageData,
	WppChatsAndMessages,
	WppChatWithDetailsAndMessages,
	WppContact,
	WppContactWithCustomer,
	WppMessage,
	WppSchedule,
	WppWallet,
} from "./types/whatsapp.types";
import FormData from "form-data";

type GetChatsResponse = DataResponse<WppChatsAndMessages>;
type GetChatResponse = DataResponse<WppChatWithDetailsAndMessages>;
type GetMessageResponse = DataResponse<WppMessage>;
type MarkChatAsReadResponse = DataResponse<WppMessage[]>;

export default class WhatsappClient extends ApiClient {
	public async getChatsBySession(
		messages = false,
		contact = false,
		token: string | null = null,
	) {
		const headers = token
			? { Authorization: `Bearer ${token}` }
			: undefined;
		const url = `/api/whatsapp/session/chats?messages=${messages}&contact=${contact}`;

		const { data: res } = await this.ax.get<GetChatsResponse>(url, {
			headers,
		});

		return res.data;
	}

	public async getChatById(id: number) {
		const { data: res } = await this.ax.get<GetChatResponse>(
			`/api/whatsapp/chats/${id}`,
		);

		return res.data;
	}

	public async getMessageById(id: string) {
		const { data: res } = await this.ax.get<GetMessageResponse>(
			`/api/whatsapp/messages/${id}`,
		);

		return res.data;
	}

	public async getUserWallets(instance: string, userId: number) {
		const { data: res } = await this.ax.get<DataResponse<WppWallet[]>>(
			`/api/wallets?instance=${instance}&userId=${userId}`,
		);

		return res.data;
	}

	public async markContactMessagesAsRead(contactId: number) {
		const url = "/api/whatsapp/messages/mark-as-read";
		const body = { contactId };
		const { data: res } = await this.ax.patch<MarkChatAsReadResponse>(
			url,
			body,
		);

		return res.data;
	}

	public async sendMessage(to: string, data: SendMessageData) {
		const url = "/api/whatsapp/messages";
		const formData = new FormData();

		formData.append("to", to);
		data.text && formData.append("text", data.text);
		data.file && formData.append("file", data.file);
		data.quotedId && formData.append("quotedId", String(data.quotedId));
		data.chatId && formData.append("chatId", String(data.chatId));
		data.contactId && formData.append("contactId", String(data.contactId));
		data.sendAsAudio && formData.append("sendAsAudio", "true");
		data.sendAsDocument && formData.append("sendAsDocument", "true");
		data.sendAsChatOwner &&
			formData.append("sendAsChatOwner", String(data.sendAsChatOwner));

		const { data: res } = await this.ax.post<DataResponse<WppMessage>>(
			url,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

		return res.data;
	}

	public async finishChatById(id: number, resultId: number) {
		const url = `/api/whatsapp/chats/${id}/finish`;
		const body = { resultId };

		await this.ax.post<MessageResponse>(url, body);
	}

	public async startChatByContactId(contactId: number) {
		const url = `/api/whatsapp/chats`;
		const body = { contactId };

		const { data: res } = await this.ax.post<
			DataResponse<WppChatWithDetailsAndMessages>
		>(url, body);

		return res.data;
	}

	public async getResults() {
		const url = `/api/whatsapp/results`;
		const { data: res } =
			await this.ax.get<DataResponse<{ id: number; name: string }[]>>(
				url,
			);

		return res.data;
	}

	public async getCustomerContacts(customerId: number) {
		const url = `/api/whatsapp/customer/${customerId}/contacts`;
		const { data: res } =
			await this.ax.get<DataResponse<WppContact[]>>(url);

		return res.data;
	}

	public async getContactsWithCustomer() {
		const url = `/api/whatsapp/contacts/customer`;
		const { data: res } =
			await this.ax.get<DataResponse<WppContactWithCustomer[]>>(url);

		return res.data;
	}
	public async getContacts() {
		const url = `/api/whatsapp/contacts`;
		const { data: res } =
			await this.ax.get<DataResponse<WppContact[]>>(url);

		return res.data;
	}
	public async createContact(
		name: string,
		phone: string,
		customerId?: number,
	) {
		const baseUrl = `/api/whatsapp`;
		const url = customerId
			? `${baseUrl}/customers/${customerId}/contacts`
			: `${baseUrl}/contacts`;

		const body = { name, phone };

		const { data: res } = await this.ax.post<DataResponse<WppContact>>(
			url,
			body,
		);

		return res.data;
	}

	public async updateContact(contactId: number, name: string) {
		const url = `/api/whatsapp/contacts/${contactId}`;
		const body = { name };

		const { data: res } = await this.ax.put<DataResponse<WppContact>>(
			url,
			body,
		);

		return res.data;
	}

	public async deleteContact(contactId: number) {
		const url = `/api/whatsapp/contacts/${contactId}`;

		await this.ax.delete<MessageResponse>(url);
	}

	public async getSectors() {
		const url = `/api/whatsapp/sectors`;
		const { data: res } =
			await this.ax.get<DataResponse<{ id: number; name: string }[]>>(
				url,
			);

		return res.data;
	}

	public setAuth(token: string) {
		this.ax.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
	public async getChatsMonitor() {
		const url = `/api/whatsapp/session/monitor`;

		const { data: res } = await this.ax.get<GetChatsResponse>(url);

		return res.data;
	}
	public async transferAttendance(id: number, userId: number) {
		const url = `/api/whatsapp/chats/${id}/transfer`;
		const body = { userId };

		await this.ax.post<MessageResponse>(url, body);
	}
	public async getNotifications() {
		const url = `/api/whatsapp/notifications`;
		const { data: res } =
			await this.ax.get<DataResponse<any>>(url);

		return res.data;
	}

	public async markAllAsReadNotification ()  {
		const url = `/api/whatsapp/notifications/mark-all-read`;
		const { data: res } = 
				await this.ax.get<DataResponse<any>>(url);

		return res.data;
  };

	/**
	 * Obtém os detalhes de um agendamento.
	 * @param filters - keys de WppSchedule.
	 * @param userId/sectorId filtrar por usúario/setor
	 * @returns Uma Promise que resolve para um array de objetos wppSchedule.
	 */
	public async getSchedules(
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

		const response = await this.ax.get(baseUrl);
		return response.data;
	}

	/**
	 * Cria um novo agendamento.
	 * @param scheduleData - Os dados do agendamento, keys de wppSchedule.
	 * @returns Uma Promise que resolve para um objeto wppSchedule.
	 */
	public async createSchedule(data: CreateScheduleDTO) {
		const response = await this.ax.post(`/api/whatsapp/schedules`, data);
		return response.data;
	}

	/**
	 * Edita um agendamento existente.
	 * @param scheduleId - O ID do agendamento a ser editado.
	 * @param updatedData - Os dados atualizados do agendamento.
	 * @returns Uma Promise que resolve para um objeto wppSchedule.
	 */
	public async updateSchedule(
		scheduleId: number,
		updatedData: Record<string, WppSchedule>,
	) {
		const response = await this.ax.patch(
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
	public async deleteSchedule(scheduleId: number) {
		const response = await this.ax.delete(
			`/api/whatsapp/schedules/${scheduleId}`,
		);
		return response.data;
	}
}
