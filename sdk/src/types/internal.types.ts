import { WppMessageStatus } from "./whatsapp.types";

export interface InternalMessage {
	id: number;
	instance: string;
	from: string;
	type: string;
	quotedId: number | null;
	internalChatId: number;
	body: string;
	timestamp: string;
	status: WppMessageStatus;
	fileId: number | null;
	fileName: string | null;
	fileType: string | null;
	fileSize: string | null;
}

export interface InternalChat {
	id: number;
	instance: string;
	creatorId: number | null;
	sectorId: number | null;
	isFinished: boolean;
	startedAt: Date;
	finishedAt: Date | null;
	finishedBy: number | null;
	isGroup: boolean;
	groupName: string | null;
	groupDescription: string | null;
}

export interface InternalChatMember {
	internalchatId: number;
	internalcontactId: number;
	joinedAt: string;
	lastReadAt?: string | null;
}

export interface InternalSendMessageData {
	sendAsAudio?: boolean;
	sendAsDocument?: boolean;
	quotedId?: number | null;
	chatId: number;
	text: string;
	file?: File;
	fileId?: number;
}
