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
	instance: string;
	userId: string;
	format: ChatsReportFormat;
	startDate: string;
	endDate: string;
}


export default class ReportSDK {
	constructor(private readonly httpClient: AxiosInstance) { }

	public async getChatsReports(instanceName: string) {
		const url = `/${instanceName}/reports/chats`;
		const response =
			await this.httpClient.get<DataResponse<Array<ChatsReport>>>(url);

		return response.data;
	}

	public async generateChatsReport({
		instance,
		...body
	}: GenerateChatsReportOptions) {
		const url = `/${instance}/reports/chats`;
		const response = await this.httpClient.post<DataResponse<ChatsReport>>(
			url,
			body,
		);

		return response.data;
	}

	public async deleteChatsReport(instanceName: string, chatsReportId: number) {
		const url = `/${instanceName}/reports/chats/${chatsReportId}`;
		const response = await this.httpClient.delete<MessageResponse>(url);

		return response.data;
	}
}
