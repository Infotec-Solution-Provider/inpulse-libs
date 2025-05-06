import {
	SocketServerAdminRoom,
	SocketServerChatRoom,
	SocketServerInternalChatRoom,
	SocketServerReportsRoom,
	SocketServerRoom,
} from "./socket-rooms.types";
import { MessageResponse } from "./response.types";
import { WppMessage, WppMessageStatus } from "./whatsapp.types";
import { InternalChat, InternalChatMember, InternalMessage } from "./internal.types";

export enum SocketEventType {
	WppChatStarted = "wpp_chat_started",
	WppChatFinished = "wpp_chat_finished",
	WppMessage = "wpp_message",
	WppMessageStatus = "wpp_message_status",
	WppMessageReaction = "wpp_message_reaction",
	WppContactMessagesRead = "wpp_contact_messages_read",
	WwebjsQr = "wwebjs_qr",
	WwebjsAuth = "wwebjs_auth",
	ReportStatus = "report_status",
	InternalChatStarted = "internal_chat_started",
	InternalChatFinished = "internal_chat_finished",
	InternalMessageStatus = "internal_chat_status",
	InternalMessage = "internal_message",
}

export interface EmitSocketEventFn {
	(
		type: SocketEventType.WwebjsQr,
		room: SocketServerAdminRoom,
		data: WWEBJSQrEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.WwebjsAuth,
		room: SocketServerAdminRoom,
		data: WWEBJSAuthEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.WppChatStarted,
		room: SocketServerRoom,
		data: WppChatStartedEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.WppChatFinished,
		room: SocketServerRoom,
		data: WppChatFinishedEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.WppMessage,
		room: SocketServerChatRoom,
		data: WppMessageEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.WppMessageStatus,
		room: SocketServerChatRoom,
		data: WppMessageStatusEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.WppContactMessagesRead,
		room: SocketServerChatRoom,
		data: WppContactMessagesReadEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.WppMessageReaction,
		room: SocketServerChatRoom,
		data: WppMessageReactionEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.ReportStatus,
		room: SocketServerReportsRoom,
		data: ReportStatusEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.InternalMessage,
		room: SocketServerInternalChatRoom,
		data: InternalMessageEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.InternalMessageStatus,
		room: SocketServerInternalChatRoom,
		data: InternalMessageEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.InternalChatStarted,
		room: SocketServerRoom,
		data: InternalChatStartedEventData,
	): Promise<MessageResponse>;
	(
		type: SocketEventType.InternalChatFinished,
		room: SocketServerRoom,
		data: InternalChatFinishedEventData,
	): Promise<MessageResponse>;
}

export interface ListenSocketEventFn {
	(
		type: SocketEventType.WwebjsQr,
		callback: (data: WWEBJSQrEventData) => void,
	): void;
	(
		type: SocketEventType.WwebjsAuth,
		callback: (data: WWEBJSAuthEventData) => void,
	): void;
	(
		type: SocketEventType.WppChatStarted,
		callback: (data: WppChatStartedEventData) => void,
	): void;
	(
		type: SocketEventType.WppChatFinished,
		callback: (data: WppChatFinishedEventData) => void,
	): void;
	(
		type: SocketEventType.WppMessage,
		callback: (data: WppMessageEventData) => void,
	): void;
	(
		type: SocketEventType.WppMessageStatus,
		callback: (data: WppMessageStatusEventData) => void,
	): void;
	(
		type: SocketEventType.WppContactMessagesRead,
		callback: (data: WppContactMessagesReadEventData) => void,
	): void;
	(
		type: SocketEventType.WppMessageReaction,
		callback: (data: WppMessageReactionEventData) => void,
	): void;
	(
		type: SocketEventType.ReportStatus,
		callback: (data: ReportStatusEventData) => void,
	): void;
	(
		type: SocketEventType.InternalChatStarted,
		callback: (data: InternalChatStartedEventData) => void,
	): void;
	(
		type: SocketEventType.InternalChatFinished,
		callback: (data: InternalChatFinishedEventData) => void,
	): void;
	(
		type: SocketEventType.InternalMessage,
		callback: (data: InternalMessageEventData) => void,
	): void;
	(
		type: SocketEventType.InternalMessageStatus,
		callback: (data: InternalMessageStatusEventData) => void,
	): void;
}

export interface UnlistenSocketEventFn {
	(type: SocketEventType): void;
}

// EventData types
export interface WWEBJSQrEventData {
	qr: string;
	phone: string;
}
export interface WWEBJSAuthEventData {
	phone: string;
	success: boolean;
	message?: string;
}
export interface WppChatStartedEventData {
	chatId: number;
}
export interface WppChatFinishedEventData {
	chatId: number;
}
export interface WppContactMessagesReadEventData {
	contactId: number;
}
export interface WppMessageEventData {
	message: WppMessage;
}
export interface WppMessageStatusEventData {
	messageId: number;
	contactId: number;
	status: WppMessageStatus;
}
export interface WppMessageReactionEventData {
	messageId: number;
	reaction: string;
}
export interface InternalChatStartedEventData {
	chat: InternalChat & { participants: InternalChatMember[], messages: InternalMessage[] };
}
export interface InternalChatFinishedEventData {
	chatId: number;
}
export interface InternalContactMessagesReadEventData {
	contactId: number;
}
export interface InternalMessageEventData {
	message: InternalMessage;
}
export interface InternalMessageStatusEventData {
	chatId: number;
	internalMessageId: number;
	status: WppMessageStatus;
}

export type ReportStatusEventData = {
	id: number;
	type: string;
} & (
	| {
			isCompleted: true;
			isFailed: false;
			fileId: number;
			chats: number;
			messages: number;
	  }
	| {
			isCompleted: false;
			isFailed: true;
			error: string;
	  }
	| {
			isCompleted: false;
			isFailed: false;
			progress: number;
	  }
);
