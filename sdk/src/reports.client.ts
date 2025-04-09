import ApiClient from "./api-client";
import { ChatsReport, GenerateChatsReportOptions } from "./types/reports.types";
import { DataResponse, MessageResponse } from "./types/response.types";

export default class ReportsClient extends ApiClient {
	public async getChatsReports() {
		const url = `/api/reports/chats`;
		const response =
			await this.httpClient.get<DataResponse<Array<ChatsReport>>>(url);

		return response.data;
	}

	public async generateChatsReport(body: GenerateChatsReportOptions) {
		const url = `/api/reports/chats`;
		const response = await this.httpClient.post<DataResponse<ChatsReport>>(
			url,
			body,
		);

		return response.data;
	}

	public async deleteChatsReport(chatsReportId: number) {
		const url = `/api/reports/chats/${chatsReportId}`;
		const response = await this.httpClient.delete<MessageResponse>(url);

		return response.data;
	}

	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
}
