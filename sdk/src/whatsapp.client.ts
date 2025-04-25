import ApiClient from "./api-client";
import { DataResponse, MessageResponse } from "./types/response.types";
import {
	SendMessageData,
	WppChatsAndMessages,
	WppChatWithDetailsAndMessages,
	WppContact,
	WppContactWithCustomer,
	WppMessage,
	WppWallet,
} from "./types/whatsapp.types";
import FormData from "form-data";

type GetChatsResponse = DataResponse<WppChatsAndMessages>;
type GetChatResponse = DataResponse<WppChatWithDetailsAndMessages>;
type GetMessageResponse = DataResponse<WppMessage>;
type MarkChatAsReadResponse = DataResponse<WppMessage[]>;

export default class WhatsappClient extends ApiClient {
	public async getChatsBySession(
		token: string,
		messages = false,
		contact = false,
	) {
		const url = `/api/whatsapp/session/chats?messages=${messages}&contact=${contact}`;

		const { data: res } = await this.httpClient.get<GetChatsResponse>(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.data;
	}

	public async getChatById(id: number) {
		const { data: res } = await this.httpClient.get<GetChatResponse>(
			`/api/whatsapp/chats/${id}`,
		);

		return res.data;
	}

	public async getMessageById(id: string) {
		const { data: res } = await this.httpClient.get<GetMessageResponse>(
			`/api/whatsapp/messages/${id}`,
		);

		return res.data;
	}

	public async getUserWallets(instance: string, userId: number) {
		const { data: res } = await this.httpClient.get<
			DataResponse<WppWallet[]>
		>(`/api/wallets?instance=${instance}&userId=${userId}`);

		return res.data;
	}

	public async markContactMessagesAsRead(contactId: number) {
		const url = "/api/whatsapp/messages/mark-as-read";
		const body = { contactId };
		const { data: res } =
			await this.httpClient.patch<MarkChatAsReadResponse>(url, body);

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

		const { data: res } = await this.httpClient.post<
			DataResponse<WppMessage>
		>(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return res.data;
	}

	public async finishChatById(id: number, resultId: number) {
		const url = `/api/whatsapp/chats/${id}/finish`;
		const body = { resultId };

		await this.httpClient.post<MessageResponse>(url, body);
	}

	public async startChatByContactId(contactId: number) {
		const url = `/api/whatsapp/chats`;
		const body = { contactId };

		const { data: res } = await this.httpClient.post<
			DataResponse<WppChatWithDetailsAndMessages>
		>(url, body);

		return res.data;
	}

	public async getResults() {
		const url = `/api/whatsapp/results`;
		const { data: res } =
			await this.httpClient.get<
				DataResponse<{ id: number; name: string }[]>
			>(url);

		return res.data;
	}

	public async getCustomerContacts(customerId: number) {
		const url = `/api/whatsapp/customer/${customerId}/contacts`;
		const { data: res } =
			await this.httpClient.get<DataResponse<WppContact[]>>(url);

		return res.data;
	}

	public async getContactsWithCustomer() {
		const url = `/api/whatsapp/contacts`;
		const { data: res } =
			await this.httpClient.get<DataResponse<WppContactWithCustomer[]>>(
				url,
			);

		return res.data;
	}

	public async createContact(
		name: string,
		phone: string,
		customerId: number,
	) {
		const url = `/api/whatsapp/customers/${customerId}/contacts`;
		const body = { name, phone };

		const { data: res } = await this.httpClient.post<
			DataResponse<WppContact>
		>(url, body);

		return res.data;
	}

	public async updateContact(contactId: number, name: string) {
		const url = `/api/whatsapp/contacts/${contactId}`;
		const body = { name };

		const { data: res } = await this.httpClient.put<
			DataResponse<WppContact>
		>(url, body);

		return res.data;
	}

	public async deleteContact(contactId: number) {
		const url = `/api/whatsapp/contacts/${contactId}`;

		await this.httpClient.delete<MessageResponse>(url);
	}

	public async getSectors() {
		const url = `/api/whatsapp/sectors`;
		const { data: res } =
			await this.httpClient.get<
				DataResponse<{ id: number; name: string }[]>
			>(url);

		return res.data;
	}

	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}
