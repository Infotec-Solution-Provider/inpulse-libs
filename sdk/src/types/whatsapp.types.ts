import { Customer } from "./customers.types";

export interface WppContact {
	id: number;
	name: string;
	phone: string;
	customerId?: number;
	instance: string;
	isBlocked: boolean;
	isOnlyAdmin: boolean;
}

export interface WppMessage {
	id: number;
	instance: string;
	wwebjsId?: string;
	wabaId?: string;
	from: string;
	to: string;
	type: string;
	quotedId?: string;
	chatId?: number;
	contactId?: number;
	body: string;
	timestamp: string;
	status: WppMessageStatus;
	fileId?: number;
	fileName?: string;
	fileType?: string;
	fileSize?: string;
}

export interface WppChat {
	id: number;
	instance: string;
	contactId?: number;
	userId?: number;
	walletId?: number;
	botId?: number;
	resultId?: number;
	sectorId?: number;
	type: WppChatType;
	priority: WppChatPriority;
	avatarUrl?: string;
	isFinished: boolean;
}

export interface WppSector {
	id: number;
	name: string;
	instanceName: string;
	wppInstanceId?: number;
	startChats: boolean;
	receiveChats: boolean;
}

export interface WppWallet {
	instanceName: string;
	id: number;
	name: string;
}

// Enums
export enum WppMessageStatus {
	PENDING = "PENDING",
	SENT = "SENT",
	RECEIVED = "RECEIVED",
	READ = "READ",
	DOWNLOADED = "DOWNLOADED",
	ERROR = "ERROR",
}

export enum WppChatType {
	RECEPTIVE = "RECEPTIVE",
	ACTIVE = "ACTIVE",
}

export enum WppChatPriority {
	LOW = "LOW",
	NORMAL = "NORMAL",
	HIGH = "HIGH",
	VERY_HIGH = "VERY_HIGH",
	URGENCY = "URGENCY",
}

export type WppChatWithDetails = WppChat & {
	contact: WppContact | null;
	customer: Customer | null;
};
export type WppChatsAndMessages = {
	chats: WppChatWithDetails[];
	messages: WppMessage[];
};
export type WppChatWithDetailsAndMessages = WppChatWithDetails & {
	messages: WppMessage[];
};
