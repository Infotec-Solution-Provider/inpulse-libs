import ApiClient from "./api-client";
import { DataResponse } from "./types/response.types";
import {
	WppChatsAndMessages,
	WppChatWithDetailsAndMessages,
	WppMessage,
} from "./types/whatsapp.types";

type GetChatsResponse = DataResponse<WppChatsAndMessages>;
type GetChatResponse = DataResponse<WppChatWithDetailsAndMessages>;
type GetMessageResponse = DataResponse<WppMessage>;

export default class WhatsappClient extends ApiClient {
	public async getChatsBySession(
		token: string,
		messages = false,
		contact = false,
	) {
		const url = `/api/whatsapp/session/chats?messages=${messages}&contact=${contact}`;

		const { data } = await this.httpClient.get<GetChatsResponse>(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return data;
	}

	public async getChatById(id: number) {
		const { data } = await this.httpClient.get<GetChatResponse>(
			`/api/whatsapp/chats/${id}`,
		);

		return data;
	}

	public async getMessageById(id: string) {
		const { data } = await this.httpClient.get<GetMessageResponse>(
			`/api/whatsapp/messages/${id}`,
		);

		return data;
	}

	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}
