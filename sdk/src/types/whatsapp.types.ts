import { Customer } from "./customers.types";

export interface WppContact {
	id: number;
	name: string;
	phone: string;
	customerId?: number;
	avatarUrl?: string;
	instance: string;
	isBlocked: boolean;
	isOnlyAdmin: boolean;
	lastOutOfHoursReplySentAt?: Date | null;
	sectors?: {
		contactId: number;
		sectorId: number;
	}[];
	sectorIds?: number[];
}export interface WppContactWithCustomer {
	id: number;
	name: string;
	phone: string;
	customerId: number | null;
	avatarUrl: string | null;
	instance: string;
	isBlocked: boolean;
	isOnlyAdmin: boolean;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date | null;
	conversationExpiration: string | null;
	customer: Customer | null;
	chatingWith: string | null;
	lastOutOfHoursReplySentAt: Date | null;
	sectorIds: number[];
}

export interface PaginatedContactsResponse {
	data: WppContactWithCustomer[];
	pagination: {
		page: number;
		perPage: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

export interface WppMessage {
	id: number;
	instance: string;
	wwebjsId: string | null;
	wabaId: string | null;
	gupshupId: string | null;
	gupshupRequestId: string | null;
	from: string;
	to: string;
	type: string;
	quotedId: number | null;
	chatId: number | null;
	contactId: number | null;
	body: string;
	timestamp: string;
	status: WppMessageStatus;
	isForwarded: boolean;
	isEdited: boolean;
	fileId: number | null;
	fileName: string | null;
	fileType: string | null;
	fileSize: string | null;
	wwebjsIdStanza: string | null;
	sentAt: Date;
	userId: number | null;
	billingCategory: string | null;
	clientId: number | null;
}
export interface ForwardMessagesData {
	sourceType: "whatsapp" | "internal";
	messageIds: number[];
	whatsappTargets?: Array<{ id: string; isGroup: boolean }>;
	internalTargets?: Array<{ id: number }>;
}

export interface WppChat {
	id: number;
	instance: string;
	contactId?: number;
	userId?: number;
	userName?: string;
	walletId?: number;
	botId?: number;
	resultId?: number;
	sectorId?: number;
	type: WppChatType;
	priority: WppChatPriority;
	avatarUrl?: string;
	isFinished: boolean;
	startedAt: Date;
	finishedAt?: Date | null;
	finishedBy?: number | null;
	isSchedule: boolean;
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
	instance: string;
	id: number;
	name: string;
	userIds: number[];
}

// Enums
export type WppMessageStatus =
	| "PENDING"
	| "SENT"
	| "RECEIVED"
	| "READ"
	| "DOWNLOADED"
	| "ERROR"
	| "REVOKED";

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
	schedule: WppSchedule | null;
};
export type WppChatsAndMessages = {
	chats: WppChatWithDetails[];
	messages: WppMessage[];
};
export type WppChatWithDetailsAndMessages = WppChatWithDetails & {
	messages: WppMessage[];
};

export interface SendMessageData {
	sendAsChatOwner?: boolean;
	contactId: number;
	text: string;
	quotedId?: number | null;
	chatId?: number | null;
}

export interface SendFileMessageData extends SendMessageData {
	fileId: number;
	publicFileId: string;
	sendAsDocument?: boolean;
	sendAsAudio?: boolean;
}

export interface MonitorChat {
	id: string;
	erpCode: string;
	companyName: string;
	contactName: string;
	whatsappNumber: string;
	sectorName: string;
	attendantName: string;
	startDate: string;
	endDate: string;
	result: string;
}

export interface CreateScheduleDTO {
	contactId: number;
	date: Date;
	scheduledFor: number;
	sectorId: number;
}

export interface WppSchedule {
	id: number;
	instance: string;
	sectorId: number;
	description: string | null;
	contactId: number;
	scheduleDate: string;
	scheduledBy: number;
	scheduledFor: number;
	scheduledAt: string;
	chatId: number | null;
	contact: WppContact;
}
export type NotificationType =
	| "CHAT_AUTO_FINISHED"
	| "CHAT_TRANSFERRED"
	| "CHAT_REASSIGNED"
	| "ALERT"
	| "INFO"
	| "WARNING"
	| "ERROR";

export interface AppNotification {
	id: number;
	title: string;
	description: string;
	read: boolean;
	instance: string;
	userId: number | null;
	chatId: number | null;
	type: NotificationType;
	createdAt: string;
}

export interface PaginatedNotificationsResponse {
	notifications: AppNotification[];
	totalCount: number;
}
export type Frequency = "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export interface AutomaticResponseSchedule {
	id?: number;

	frequency: Frequency;
	daysOfWeek?: number[] | null;
	dayOfMonth?: number | null;
	month?: number | null;

	startDate?: string | null;
	endDate?: string | null;

	startTime: string;
	endTime: string;
	timezone?: string | null;

	dayOfWeek?: number | null;
}

export interface AutomaticResponseRule {
	id: number;
	name: string;
	message: string;
	isEnabled: boolean;
	isGlobal: boolean;
	cooldownSeconds: number;
	fileId: number | null;
	schedules: AutomaticResponseSchedule[];
	userAssignments: { userId: number }[];
}

export interface AutomaticResponseRuleDTO {
	name: string;
	message: string;
	isEnabled: boolean;
	isGlobal: boolean;
	cooldownSeconds: number;
	fileId?: number | null;
	userIds: number[];
	schedules: Omit<AutomaticResponseSchedule, "id">[];
}
