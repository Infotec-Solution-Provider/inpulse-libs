import { AxiosInstance } from "axios";
import { DataResponse, MessageResponse } from "./response";

export type ReportType = "chats";
export type ChatsReportFormat = "txt" | "csv" | "pdf";
export type ChatsReportStatus = "pending" | "completed" | "failed";

export interface ChatsReport {
	id: number;
	userId: string;
	fileId: number;
	instance: string;
	startDate: string;
	endDate: string;
	exportDate: string;
	chats: number;
	messages: number;
	format: ChatsReportFormat;
	status: ChatsReportStatus;
}

export interface GenerateChatsReportOptions {
	userId: string;
	format: ChatsReportFormat;
	startDate: string;
	endDate: string;
}

export default class ReportSDK {
	constructor(private readonly httpClient: AxiosInstance) { }

	public async getChatsReports() {
		const url = `/reports/chats`;
		const response =
			await this.httpClient.get<DataResponse<Array<ChatsReport>>>(url);

		return response.data;
	}

	public async generateChatsReport(body: GenerateChatsReportOptions) {
		const url = `/reports/chats`;
		const response = await this.httpClient.post<DataResponse<ChatsReport>>(
			url,
			body,
		);

		return response.data;
	}

	public async deleteChatsReport(chatsReportId: number) {
		const url = `/reports/chats/${chatsReportId}`;
		const response = await this.httpClient.delete<MessageResponse>(url);

		return response.data;
	}

	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
}
