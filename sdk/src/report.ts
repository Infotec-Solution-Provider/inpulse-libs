import { AxiosInstance } from "axios";
import { DataResponse, MessageResponse } from "./response";

export enum ChatsReportStatus {
	PENDING = "PENDING",
	COMPLETED = "COMPLETED",
	FAILED = "FAILED",
}

export interface ChatsReport {
	id: number;
	userId: string;
	fileId: number;
	instance: string;
	format: string;
	startDate: string;
	endDate: string;
	exportDate: string;
	chats: number;
	messages: number;
	status: ChatsReportStatus;
}

export interface GenerateChatsReportOptions {
	instance: string;
	userId: string;
	format: ChatsReportFileFormat;
	startDate: string;
	endDate: string;
}

export enum ChatsReportFileFormat {
	TXT = "txt",
	CSV = "csv",
	PDF = "pdf",
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
