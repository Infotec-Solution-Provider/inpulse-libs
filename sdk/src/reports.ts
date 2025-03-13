import { AxiosInstance } from "axios";
import { DataResponse, MessageResponse } from "./response";

export interface ChatReport {
	id: number;
	userId: string;
	fileId: number;
	instance: string;
	format: string;
	startDate: string;
	endDate: string;
	exportDate: string;
}

export interface GenerateChatReportOptions {
	instance: string;
	userId: string;
	format: ChatReportFileFormat;
	startDate: string;
	endDate: string;
}

export enum ChatReportFileFormat {
	TXT = "txt",
	CSV = "csv",
	PDF = "pdf",
}

export default class ReportsSDK {
	constructor(private readonly httpClient: AxiosInstance) {}

	public async getChatsReports(instanceName: string) {
		const url = `/${instanceName}/reports/chats`;
		const response =
			await this.httpClient.get<DataResponse<Array<ChatReport>>>(url);

		return response.data;
	}

	public async generateChatReport({
		instance,
		...body
	}: GenerateChatReportOptions) {
		const url = `/${instance}/reports/chats`;
		const response = await this.httpClient.post<DataResponse<ChatReport>>(
			url,
			body,
		);

		return response.data;
	}

    public async deleteReport(instanceName: string, reportId: number) {
        const url = `/${instanceName}/reports/chats/${reportId}`;
        const response = await this.httpClient.delete<MessageResponse>(url);

        return response.data;
    }
}
