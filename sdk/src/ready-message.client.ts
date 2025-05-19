import ApiClient from "./api-client";
import { DataResponse } from "./types/response.types";
import {
	ReadyMessage,
} from "./types/ready-messages.types";
import FormData from "form-data";

export default class ReadyMessageClient extends ApiClient {
	public async createReadyMessage(
		File: File | null = null,
		TITULO: string| null = null,
		TEXTO_MENSAGEM: string| null = null,
	) {
		const form = new FormData();

		if (File) {
			form.append("file", File);
		}

		form.append(
			"data",
			JSON.stringify({ TITULO, TEXTO_MENSAGEM }),
		);

		const { data: res } = await this.httpClient.post<
			DataResponse<ReadyMessage>
		>(`/api/ready-messages`, form, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return res.data;
	}

	public async deleteReadyMessage(chatId: number) {
		const url = `/api/ready-messages/${chatId}`;
		await this.httpClient.delete<DataResponse<ReadyMessage>>(url);
	}

	public async getReadyMessages() {
		const url = `/api/ready-messages`;
		const { data: res } =
			await this.httpClient.get<DataResponse<ReadyMessage[]>>(url);

		return res.data;
	}

	public async updateReadyMessage(id:number, ReadyMessage: ReadyMessage, file: File) {
		const formData = new FormData();
		formData.append("file", file);
		formData.append(
			"data",
			JSON.stringify(ReadyMessage),
		);

		const { data: res } = await this.httpClient.put<
			DataResponse<ReadyMessage>
		>(`/api/ready-messages/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return res.data;
	}

	public setAuth(token: string) {
		this.httpClient.defaults.headers.common["Authorization"] =
			`Bearer ${token}`;
	}
}
