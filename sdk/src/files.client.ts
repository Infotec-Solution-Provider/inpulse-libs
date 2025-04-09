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
		const response = await this.httpClient.get(`/api/files/${id}`, {
			responseType: "arraybuffer",
		});
		const buffer = Buffer.from(response.data, "binary");

		return buffer;
	}

	/**
	 * Obtém a URL de download de um arquivo.
	 * @param {number} id - ID do arquivo.
	 * @returns {string} URL de download do arquivo.
	 */
	public getFileDownloadUrl(id: number): string {
		return this.httpClient.defaults.baseURL + `/api/files/${id}`;
	}

	/**
	 * Faz o upload de um arquivo.
	 * @param {UploadFileOptions} props - Opções para o upload do arquivo.
	 * @returns {Promise<File>} Os dados do arquivo enviado.
	 */
	public async uploadFile(props: UploadFileOptions): Promise<File> {
		const form = new FormData();
		form.append("instance", props.instance);
		form.append("dirType", props.dirType);
		form.append("file", new Blob([props.buffer]), props.fileName);

		const response = await this.httpClient.post<DataResponse<File>>(
			"/api/files",
			form,
			{
				headers: { "Content-Type": "multipart/form-data" },
			},
		);

		return response.data.data;
	}

	/**
	 * Deleta um arquivo pelo ID.
	 * @param {number} id - ID do arquivo.
	 * @returns {Promise<void>}
	 */
	public async deleteFile(id: number): Promise<void> {
		await this.httpClient.delete(`/api/files/${id}`);
	}
}

export default FilesClient;
