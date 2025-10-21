import ApiClient from "./api-client";
import { RequestFilters } from "./types";
import { DataResponse, MessageResponse } from "./types/response.types";
import {
	AppNotification,
	AutomaticResponseRule,
	AutomaticResponseRuleDTO,
	CreateScheduleDTO,
	ForwardMessagesData,
	PaginatedContactsResponse,
	PaginatedNotificationsResponse,
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

interface FetchMessagesFilters {
	minDate: string;
	maxDate: string;
	userId?: number | null;
}

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
		data.fileId && formData.append("fileId", String(data.fileId));
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

	public async editMessage(
		messageId: string,
		newText: string,
		isInternal = false,
	) {
		const type = isInternal ? "internal" : "whatsapp";

		const url = `/api/${type}/messages/${messageId}`;
		const body = { newText };
		await this.ax.put(url, body);
	}

	public async finishChatById(
		id: number,
		resultId: number,
		triggerSatisfactionBot = false,
	) {
		const url = `/api/whatsapp/chats/${id}/finish`;
		const body = { resultId, triggerSatisfactionBot };
		await this.ax.post<MessageResponse>(url, body);
	}

	public async startChatByContactId(contactId: number, template?: any) {
		const url = `/api/whatsapp/chats`;
		const body = { contactId, template };

		await this.ax.post<DataResponse<WppChatWithDetailsAndMessages>>(
			url,
			body,
		);
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

	public async getContactsWithCustomer(filters?: {
		name?: string;
		phone?: string;
		customerId?: number;
		customerErp?: string;
		customerCnpj?: string;
		customerName?: string;
		hasCustomer?: boolean;
		page?: number;
		perPage?: number;
	}) {
		let url = `/api/whatsapp/contacts/customer`;
		if (filters) {
			const params = new URLSearchParams();
			if (filters.name) params.append('name', filters.name);
			if (filters.phone) params.append('phone', filters.phone);
			if (filters.customerId !== undefined) params.append('customerId', String(filters.customerId));
			if (filters.customerErp) params.append('customerErp', filters.customerErp);
			if (filters.customerCnpj) params.append('customerCnpj', filters.customerCnpj);
			if (filters.customerName) params.append('customerName', filters.customerName);
			if (filters.hasCustomer !== undefined) params.append('hasCustomer', String(filters.hasCustomer));
			if (filters.page !== undefined) params.append('page', String(filters.page));
			if (filters.perPage !== undefined) params.append('perPage', String(filters.perPage));
			const queryString = params.toString();
			if (queryString) url += `?${queryString}`;
		}
		const { data: res } =
			await this.ax.get<DataResponse<PaginatedContactsResponse>>(url);
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

	public async forwardMessages(data: ForwardMessagesData) {
		const url = "/api/whatsapp/messages/forward";
		const body = data;
		await this.ax.post<MessageResponse>(url, body);
	}

	public async updateContact(
		contactId: number,
		name: string,
		customerId?: number | null,
	) {
		const url = `/api/whatsapp/contacts/${contactId}`;
		const body: Record<string, any> = { name };
		customerId !== undefined && (body["customerId"] = customerId);
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
	/**
	 * Busca as notificações do usuário de forma paginada.
	 */
	public async getNotifications(params: { page: number; pageSize: number }) {
		const searchParams = new URLSearchParams({
			page: String(params.page),
			pageSize: String(params.pageSize),
		});
		const url = `/api/whatsapp/notifications?${searchParams.toString()}`;
		const { data: res } =
			await this.ax.get<DataResponse<PaginatedNotificationsResponse>>(
				url,
			);
		return res;
	}

	/**
	 * Marca todas as notificações do usuário como lidas.
	 */
	public async markAllAsReadNotification() {
		const url = `/api/whatsapp/notifications/mark-all-read`;
		const { data: res } = await this.ax.patch<MessageResponse>(url);
		return res;
	}

	/**
	 * Marca uma notificação específica como lida.
	 * @param notificationId - O ID (numérico) da notificação a ser marcada.
	 */
	public async markOneAsReadNotification(notificationId: number) {
		const url = `/api/whatsapp/notifications/${notificationId}/read`;
		const { data: res } =
			await this.ax.patch<DataResponse<AppNotification>>(url);
		return res;
	}

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

	public async getMessages(token: string, filters: FetchMessagesFilters) {
		const params = new URLSearchParams(
			Object.entries(filters)
				.filter(([_, v]) => v !== undefined && v !== null)
				.reduce<Record<string, string>>((acc, [k, v]) => {
					acc[k] = String(v);
					return acc;
				}, {}),
		);
		const url = `/api/whatsapp/messages?${params.toString()}`;
		const { data: res } = await this.ax.get<
			DataResponse<(WppMessage & { WppContact: WppContact | null })[]>
		>(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	}
	public async getAutoResponseRules() {
		const url = `/api/auto-response-rules`;
		const { data: res } =
			await this.ax.get<DataResponse<AutomaticResponseRule[]>>(url);
		return res.data;
	}

	public async createAutoResponseRule(ruleData: AutomaticResponseRuleDTO) {
		const url = `/api/auto-response-rules`;
		const { data: res } = await this.ax.post<
			DataResponse<AutomaticResponseRule>
		>(url, ruleData);
		return res.data;
	}

	public async updateAutoResponseRule(
		id: number,
		ruleData: Omit<AutomaticResponseRuleDTO, "instance">,
	) {
		const url = `/api/auto-response-rules/${id}`;
		const { data: res } = await this.ax.put<
			DataResponse<AutomaticResponseRule>
		>(url, ruleData);
		return res.data;
	}

	public async deleteAutoResponseRule(id: number) {
		const url = `/api/auto-response-rules/${id}`;
		await this.ax.delete<MessageResponse>(url);
	}
}
