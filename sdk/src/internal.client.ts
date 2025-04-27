import ApiClient from "./api-client";
import { DataResponse } from "./types/response.types";
import { InternalChat, InternalChatsAndMessages, InternalChatWithDetailsAndMessages, InternalContactWithUser } from "./types/internal.types";

type GetChatsResponse = DataResponse<InternalChatsAndMessages>;

	export default class InternalChatClient extends ApiClient {
		public async getChatsBySession(
			messages = false,
			contact = false,
		) {
			const url = `/api/internal/session/chats?messages=${messages}&contact=${contact}`;
	
			console.log(this.httpClient.defaults.headers.common["Authorization"]);
			const { data: res } = await this.httpClient.get<GetChatsResponse>(url);
	
			return res.data;
		}
		public async getChatsForUser(userId: number, instance: string) {
			const url = `/api/internal/chats?userId=${userId}&instance=${instance}`;
			const { data: res } = await this.httpClient.get<DataResponse<InternalChat[]>>(url);
			return res.data;
		}
	
		public async getChatById(id: number) {
			const { data: res } = await this.httpClient.get<DataResponse<InternalChat>>(`/api/internal/chats/${id}`);
			return res.data;
		}
	
		public async sendMessageToChat(chatId: number, userId: number, content: string) {
			const { data: res } = await this.httpClient.post(`/api/internal/chats/${chatId}/messages?userId=${userId}`, {
				content,
			});
			return res;
		}
	
		public async createGroup(name: string, participantIds: number[], userId: number) {
			const { data: res } = await this.httpClient.post<DataResponse<InternalChat>>(
				`/api/internal/chats/group?userId=${userId}`,
				{ name, participantIds }
			);
			return res.data;
		}
	
		public async updateGroupMembers(groupId: number, add: number[], remove: number[]) {
			const { data: res } = await this.httpClient.put<DataResponse<any>>(
				`/api/internal/chats/group/${groupId}/members`,
				{ add, remove }
			);
			return res.data;
		}
		
		public async getContactsWithUser() {
			const url = `/api/internal/contacts`;
			const { data: res } =
				await this.httpClient.get<DataResponse<InternalContactWithUser[]>>(
					url,
				);
	
			return res.data;
		}
		public async startChatByContactId(contactId: number) {
			const url = `/api/internal/chats`;
			const body = { contactId };

			const { data: res } = await this.httpClient.post<
				DataResponse<InternalChatWithDetailsAndMessages>
			>(url, body);

			return res.data;
		}

		public setAuth(token: string) {
			this.httpClient.defaults.headers.common["Authorization"] =
				`Bearer ${token}`;
		}
}
