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

	/**
	 * Faz o upload de um arquivo.
	 * @param {UploadFileOptions} props - Opções para o upload do arquivo.
	 * @returns {Promise<File>} Os dados do arquivo enviado.
	 */
public async uploadFile(props: UploadFileOptions): Promise<File> {
  const form = new FormData();
  form.append("instance", props.instance);
  form.append("dirType", String(props.dirType));
  form.append("fileName", props.fileName);

  const src: any = props.buffer as any;
  let ab: ArrayBuffer;

  if (src instanceof ArrayBuffer) {
    ab = src;
  } else if (typeof SharedArrayBuffer !== "undefined" && src instanceof SharedArrayBuffer) {
    const view = new Uint8Array(src);
    const copy = new Uint8Array(view.byteLength);
    copy.set(view);
    ab = copy.buffer;
  } else if (ArrayBuffer.isView(src)) {
    const view = src as ArrayBufferView;
    const total = view.byteLength;
    const offset = (view as any).byteOffset ?? 0;
    const backing = (view as any).buffer as ArrayBuffer | SharedArrayBuffer;

    if (typeof SharedArrayBuffer !== "undefined" && backing instanceof SharedArrayBuffer) {
      const from = new Uint8Array(backing, offset, total);
      const copy = new Uint8Array(total);
      copy.set(from);
      ab = copy.buffer;
    } else {
      ab = (backing as ArrayBuffer).slice(offset, offset + total);
    }
  } else {
    const u8 = Uint8Array.from(src as ArrayLike<number>);
    ab = u8.buffer;
  }

  const blob = new Blob([ab], { type: props.mimeType || "application/octet-stream" });

  form.append("file", blob, props.fileName);

  const { data } = await this.ax.post<DataResponse<File>>("/api/files", form, {
    headers: { "Content-Type": undefined },
  });

  return data.data;
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
