import ApiClient from "./api-client";
import { DataResponse } from "./types/response.types";
import {
	WppChatsAndMessages,
	WppChatWithDetailsAndMessages,
	WppMessage,
	WppWallet,
} from "./types/whatsapp.types";

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

	public async markChatAsRead(chatId: number) {
		const url = "/api/whatsapp/messages/mark-as-read";
		const body = { chatId };
		const { data: res } =
			await this.httpClient.post<MarkChatAsReadResponse>(url, body);

		return res.data;
	}

	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}
