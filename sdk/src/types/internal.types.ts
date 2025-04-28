import { User } from "./user.types";

export interface InternalContact {
	id: number;
	name: string;
	phone: string;
	userId?: number;
	instance: string;
	isDeleted: boolean;
	isBlocked: boolean;
	isOnlyAdmin: boolean;
}

export interface InternalMessage {
	id: number;
	instance: string;
	from: string;
	to: string;
	type: string;
	quotedId?: number | null;
	internalchatId?: number | null;
	internalcontactId?: number | null;
	body: string;
	timestamp: string; // DateTime como ISO
	status: InternalMessageStatus;
	fileId?: number | null;
	fileName?: string | null;
	fileType?: string | null;
	fileSize?: string | null;
}

export interface InternalChat {
	id: number;
	instance: string;
	internalcontactId?: number | null;
	userId?: number | null;
	sectorId?: number | null;
	avatarUrl?: string | null;
	isFinished: boolean;
	startedAt?: string | null;
	finishedAt?: string | null;
	finishedBy?: number | null;
	isGroup: boolean;
	groupName?: string | null;
	groupDescription?: string | null;
	groupCreatedBy?: number | null;
	groupCreatedAt?: string | null;
}

export interface InternalChatMember {
	internalchatId: number;
	internalcontactId: number;
	joinedAt: string;
	lastReadAt?: string | null;
}

export interface InternalChatTag {
	internalchatId: number;
	tagId: number;
}

export interface InternalContactWithUser {
	id: number;
	name: string;
	phone: string;
	userId?: number;
	instance: string;
	isBlocked: boolean;
	isOnlyAdmin: boolean;
	user: User | null;
	chatingWith: string | null;
}

export interface Sector {
	id: number;
	name: string;
	instanceName: string;
	wppInstanceId?: number;
	startChats: boolean;
	receiveChats: boolean;
}

	export type InternalMessageStatus =
	| "PENDING"
	| "SENT"
	| "RECEIVED"
	| "READ"
	| "DOWNLOADED"
	| "ERROR"
	| "REVOKED";

export enum InternalChatType {
	RECEPTIVE = "RECEPTIVE",
	ACTIVE = "ACTIVE",
}

export enum IntenalChatPriority {
	LOW = "LOW",
	NORMAL = "NORMAL",
	HIGH = "HIGH",
	VERY_HIGH = "VERY_HIGH",
	URGENCY = "URGENCY",
}

export type InternalChatWithDetails = InternalChat & {
	contact: InternalContact | null;
	user: User | null;
};
export type InternalChatsAndMessages = {
	chats: InternalChatWithDetails[];
	messages: InternalMessage[];
};
export type InternalChatWithDetailsAndMessages = InternalChatWithDetails & {
	messages: InternalMessage[];
};

export interface InternalSendMessageData {
	sendAsChatOwner?: boolean;
	sendAsAudio?: boolean;
	sendAsDocument?: boolean;
	contactId: number;
	quotedId?: number | null;
	chatId?: number | null;
	text?: string | null;
	file?: File;
	fileId?: number;
}
