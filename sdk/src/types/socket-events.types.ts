import {
	SocketServerAdminRoom,
	SocketServerChatRoom,
	SocketServerReportsRoom,
	SocketServerRoom,
} from "./socket-rooms.types";
import { MessageResponse } from "./response.types";
import { WppMessage, WppMessageStatus } from "./whatsapp.types";

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
}

export interface UnlistenSocketEventFn {
	(type: SocketEventType): void;
}

// EventData
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
