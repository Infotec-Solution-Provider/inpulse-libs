import ApiClient from "./api-client";
import { ChatsReport, GenerateChatsReportOptions } from "./types/reports.types";
import { DataResponse, MessageResponse } from "./types/response.types";

/**
 * ReportsClient class to handle reports related API calls.
 *
 * This class extends the ApiClient class and provides methods to interact with the reports API.
 * It includes methods to get, generate, and delete chat reports.
 */
export default class ReportsClient extends ApiClient {
	/**
	 * Retrieves chat reports from the server.
	 *
	 * @returns A promise that resolves to an array of chat reports wrapped in a `DataResponse` object.
	 */
	public async getChatsReports() {
		const url = `/api/reports/chats`;
		const { data: res } =
			await this.httpClient.get<DataResponse<Array<ChatsReport>>>(url);

		return res.data;
	}

	/**
	 * Generates a report for chat interactions based on the provided options.
	 *
	 * @param body - The options for generating the chats report, including filters and parameters.
	 * @returns A promise that resolves to the data of the generated chats report.
	 */
	public async generateChatsReport(body: GenerateChatsReportOptions) {
		const url = `/api/reports/chats`;
		const { data: res } = await this.httpClient.post<
			DataResponse<ChatsReport>
		>(url, body);

		return res.data;
	}

	/**
	 * Deletes a chat report by its unique identifier.
	 *
	 * @param chatsReportId - The unique identifier of the chat report to be deleted.
	 */
	public async deleteChatsReport(chatsReportId: number) {
		const url = `/api/reports/chats/${chatsReportId}`;
		await this.httpClient.delete<MessageResponse>(url);
	}

	/**
	 * Sets the authorization token for the HTTP client.
	 *
	 * @param token - The Bearer token to be used for authentication.
	 *                This token will be included in the `Authorization` header
	 *                of all HTTP requests made by the client.
	 */
	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}
