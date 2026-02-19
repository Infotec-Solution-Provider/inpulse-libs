import FormData from "form-data";
import ApiClient from "./api-client";
import { File, UploadFileOptions } from "./types/files.types";
import { DataResponse } from "./types/response.types";

class FilesClient extends ApiClient {
	/**
	 * Busca um arquivo pelo ID.
	 * @param {number} id - ID do arquivo.
	 * @returns {Promise<Buffer>} Um buffer contendo os dados do arquivo.
	 */
	public async fetchFile(id: number): Promise<Buffer> {
		const response = await this.ax.get(`/api/files/${id}`, {
			responseType: "arraybuffer",
		});
		const buffer = Buffer.from(response.data, "binary");

		return buffer;
	}

	/**
	 * Fetches the metadata of a file by its ID.
	 *
	 * @param id - The unique identifier of the file.
	 * @returns A promise that resolves to the file metadata.
	 * @throws Will throw an error if the HTTP request fails.
	 */
	public async fetchFileMetadata(id: number): Promise<File> {
		const { data: res } = await this.ax.get<DataResponse<File>>(
			`/api/files/${id}/metadata`,
		);

		return res.data;
	}

	/**
	 * Obtém a URL de download de um arquivo.
	 * @param {number} id - ID do arquivo.
	 * @returns {string} URL de download do arquivo.
	 */
	public getFileDownloadUrl(id: number, baseUrl?: string): string {
		return (baseUrl || this.ax.defaults.baseURL) + `/api/files/${id}`;
	}

	public async getFileByHash(instance: string, hash: string): Promise<File> {
		const { data: res } = await this.ax.get<DataResponse<File>>(
			`/api/files/exists?instance=${instance}&hash=${hash}`,
		);

		return res.data;
	}

	/**
	 * Faz o upload de um arquivo.
	 * @param {UploadFileOptions} props - Opções para o upload do arquivo.
	 * @returns {Promise<File>} Os dados do arquivo enviado.
	 */
	public async uploadFile(props: UploadFileOptions): Promise<File> {
		// Node: use 'form-data' (evita conflito de tipos com Blob)
		const form = new FormData();
		form.append("instance", props.instance);
		form.append("dirType", props.dirType);

		form.append("file", props.buffer, {
			filename: props.fileName,
			contentType: props.mimeType,
		});

		const response = await this.ax.post<DataResponse<File>>("/api/files", form, {
			// deixe o boundary correto
			headers: form.getHeaders(),
		});

		return response.data.data;
	}

	/**
	 * Deleta um arquivo pelo ID.
	 * @param {number} id - ID do arquivo.
	 * @returns {Promise<void>}
	 */
	public async deleteFile(id: number): Promise<void> {
		await this.ax.delete(`/api/files/${id}`);
	}

	public async uploadWabaMedia(instance: string, wabaMediaId: string): Promise<File> {
		const response = await this.ax.post<DataResponse<File>>(`/api/waba`, { instance, wabaMediaId });
		return response.data.data;

	}
}

export default FilesClient;
