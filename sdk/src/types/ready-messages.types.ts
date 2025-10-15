/**
 * Mensagem Pronta (Ready Message)
 * Representa templates de mensagens que podem ser usadas rapidamente no atendimento
 */
export interface ReadyMessage {
	id: number;
	instance: string;
	sectorId: number;
	title: string;
	message: string;
	fileId: number | null;
	fileName: string | null;
	onlyAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * DTO para criação de mensagem pronta
 */
export interface CreateReadyMessageDto {
	title: string;
	message: string;
	sectorId?: number; // Opcional - se não fornecido, usa o setor do usuário
	onlyAdmin?: boolean;
}

/**
 * DTO para atualização de mensagem pronta
 */
export interface UpdateReadyMessageDto {
	title?: string;
	message?: string;
	onlyAdmin?: boolean;
}

/**
 * @deprecated Use CreateReadyMessageDto ao invés deste tipo legado
 * Mantido apenas para compatibilidade com código antigo que usa UPPERCASE
 */
export interface CreateReadyMessageDtoLegacy {
	TITULO: string;
	TEXTO_MENSAGEM: string;
	SETOR?: number;
	APENAS_ADMIN?: boolean;
}

/**
 * @deprecated Use UpdateReadyMessageDto ao invés deste tipo legado
 * Mantido apenas para compatibilidade com código antigo que usa UPPERCASE
 */
export interface UpdateReadyMessageDtoLegacy {
	TITULO?: string;
	TEXTO_MENSAGEM?: string;
	APENAS_ADMIN?: boolean;
}

/**
 * @deprecated Use ReadyMessage ao invés deste tipo legado
 * Mantido apenas para compatibilidade com código antigo
 */
export interface ReadyMessageLegacy {
	CODIGO: number;
	TITULO: string;
	SETOR: number;
	TEXTO_MENSAGEM: string;
	ARQUIVO: string;
	ARQUIVO_CODIGO: string;
	LAST_UPDATE: Date;
}

