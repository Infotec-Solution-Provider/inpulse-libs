import { AxiosInstance } from "axios";
import { DataResponse } from "./response";

interface UploadFileOptions {
    /**
     * Nome da instância onde o arquivo está armazenado.
     */
    instance: string;

    /**
     * Tipo de diretório onde o arquivo está armazenado.
     */
    dirType: FileDirType;

    /**
     * Nome do arquivo.
     */
    fileName: string;

    /**
     * Buffer com o conteúdo do arquivo.
     */
    buffer: Buffer;
}

/**
 * Enum que representa os tipos de diretórios de arquivos.
 * 
 * @enum {string}
 * @property {string} PUBLIC - Representa o diretório público.
 * @property {string} MODELS - Representa o diretório de modelos.
 */
export enum FileDirType {
    PUBLIC = "public",
    MODELS = "models",
}


/**
 * Representa um arquivo no sistema.
 */
export interface File {
    /**
     * Identificador único para o arquivo.
     */
    id: number;

    /**
     * Identificador único para o arquivo no armazenamento.
     */
    id_storage: string;

    /**
     * Identificador único para o armazenamento.
     */
    storage_id: number;

    /**
     * Nome do arquivo.
     */
    name: string;

    /**
     * Tipo MIME do arquivo.
     */
    mime_type: string;

    /**
     * Tamanho do arquivo em bytes.
     */
    size: number;

    /**
     * Tipo de diretório onde o arquivo está armazenado.
     */
    dir_type: FileDirType;

    /**
     * Data e hora em que o arquivo foi criado.
     */
    created_at: Date;
}


/**
 * SDK para operações de arquivos.
 */
class FileSDK {
    /**
     * Cria uma instância do SDK de arquivos.
     * @param httpClient A instância do cliente HTTP a ser usada para fazer requisições à API.
     */
    constructor(private readonly httpClient: AxiosInstance) { }

    /**
     * Busca um arquivo pelo ID.
     * @param {number} id - ID do arquivo.
     * @returns {Promise<Buffer>} Um buffer contendo os dados do arquivo.
     */
    public async fetchFile(id: number): Promise<Buffer> {
        const response = await this.httpClient.get(`/files/${id}`, {
            responseType: "arraybuffer"
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
        return this.httpClient.defaults.baseURL + `/files/${id}`;
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

        const response = await this.httpClient.post<DataResponse<File>>("/files", form, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data.data;
    }

    /**
     * Deleta um arquivo pelo ID.
     * @param {number} id - ID do arquivo.
     * @returns {Promise<void>}
     */
    public async deleteFile(id: number): Promise<void> {
        await this.httpClient.delete(`/files/${id}`);
    }
}

export default FileSDK;