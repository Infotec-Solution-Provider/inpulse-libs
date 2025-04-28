import ApiClient from "./api-client";
import { DataResponse } from "./types/response.types";
import {
	InternalChat,
	InternalMessage,
	InternalSendMessageData,
} from "./types/internal.types";
import FormData from "form-data";

type GetChatsResponse = DataResponse<{
	chats: (InternalChat & { participants: number[] })[];
	messages: InternalMessage[];
}>;
type StartChatResponse = DataResponse<{
	chat: InternalChat & { messages: InternalMessage[] };
}>;

export default class InternalChatClient extends ApiClient {
	public async createInternalChat(
		participants: number[],
		isGroup: boolean = false,
		groupName: string = "",
	) {
		const body = { participants, isGroup, groupName };

		const { data: res } = await this.httpClient.post<
			DataResponse<InternalChat>
		>(`/api/internal/chats`, body);

		return res.data;
	}
	public async getInternalChatsBySession(token: string | null = null) {
		const url = `/api/internal/session/chats`;

		const headers = token
			? { Authorization: `Bearer ${token}` }
			: undefined;

		const { data: res } = await this.httpClient.get<GetChatsResponse>(url, {
			headers,
		});

		return res.data;
	}

	public async sendMessageToChat(data: InternalSendMessageData) {
		const url = `/api/internal/chats/${data.chatId}/messages`;
		const formData = new FormData();

		formData.append("chatId", data.chatId.toString());
		formData.append("text", data.text);
		data.quotedId && formData.append("quotedId", data.quotedId.toString());
		data.sendAsAudio && formData.append("sendAsAudio", "true");
		data.sendAsDocument && formData.append("sendAsDocument", "true");
		data.file && formData.append("file", data.file);
		data.fileId && formData.append("fileId", data.fileId.toString());

		await this.httpClient.post<DataResponse<InternalMessage>>(
			url,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
	}

	public async updateGroupMembers(
		groupId: number,
		{ name, participants }: { name: string; participants: number[] },
	) {
		const { data: res } = await this.httpClient.put<DataResponse<any>>(
			`/api/internal/chats/group/${groupId}/members`,
			{ name, participants },
		);
		return res.data;
	}

	public async startChatByContactId(contactId: number) {
		const url = `/api/internal/chats`;
		const body = { contactId };

		const { data: res } = await this.httpClient.post<StartChatResponse>(
			url,
			body,
		);

		return res.data;
	}

	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}
