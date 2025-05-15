import ApiClient from "./api-client";
import { DataResponse } from "./types/response.types";
import {
	InternalChat,
	InternalChatMember,
	InternalGroup,
	InternalMessage,
	InternalSendMessageData,
} from "./types/internal.types";
import FormData from "form-data";

type GetChatsResponse = DataResponse<{
	chats: (InternalChat & { participants: InternalChatMember[] })[];
	messages: InternalMessage[];
}>;
export default class InternalChatClient extends ApiClient {
	public async createInternalChat(
		participants: number[],
		isGroup: boolean = false,
		groupName: string | null = null,
		groupId: string | null = null,
	) {
		const body = { participants, isGroup, groupName, groupId };

		const { data: res } = await this.httpClient.post<
			DataResponse<InternalChat>
		>(`/api/internal/chats`, body);

		return res.data;
	}

	public async deleteInternalChat(chatId: number) {
		const url = `/api/internal/chats/${chatId}`;
		await this.httpClient.delete<DataResponse<InternalChat>>(url);
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

	public async getInternalGroups() {
		const url = `/api/internal/groups`;
		const { data: res } =
			await this.httpClient.get<DataResponse<InternalGroup[]>>(url);

		return res.data;
	}

	public async sendMessageToInternalChat(data: InternalSendMessageData) {
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

	public async updateInternalGroup(
		groupId: number,
		data: {
			name: string;
			participants: number[];
			wppGroupId: string | null;
		},
	) {
		const { data: res } = await this.httpClient.put<
			DataResponse<InternalGroup>
		>(`/api/internal/groups/${groupId}`, data);
		return res.data;
	}

	public async updateInternalGroupImage(groupId: number, file: File) {
		const formData = new FormData();
		formData.append("file", file);

		const { data: res } = await this.httpClient.put<
			DataResponse<InternalGroup>
		>(`/api/internal/groups/${groupId}/image`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return res.data;
	}

	public async markChatMessagesAsRead(chatId: number) {
		const url = `/api/internal/chat/${chatId}/mark-as-read`;
		await this.httpClient.patch(url);
	}
	public async getInternalChatsMonitor() {
		const url = `/api/internal/monitor/chats`;
		const { data: res } = await this.httpClient.get<GetChatsResponse>(url);

		return res.data;
	}
	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}
