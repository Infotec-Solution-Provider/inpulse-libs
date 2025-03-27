import { SocketClientAdminRoom, SocketClientChatRoom, SocketClientMonitorRoom, SocketClientReportsRoom } from "./socket-client.types";

/**
 * Tipos de eventos que podem ser emitidos ou recebidos via socket.
 */
export type SocketEventType =
    "message" |
    "message_edit" |
    "message_status" |
    "new_chat" |
    "chat_finished" |
    "notification" |
    "qr_code" |
    "report_status";

type SocketRoomWithInstance<T extends string> = `${string}:${T}`;
type SocketRoomWithSector<T extends string> = SocketRoomWithInstance<`:${number}:${T}`>;
export type SocketServerAdminRoom = SocketRoomWithSector<SocketClientAdminRoom>;
export type SocketServerMonitorRoom = SocketRoomWithSector<SocketClientMonitorRoom>;
export type SocketServerReportsRoom = SocketRoomWithSector<SocketClientReportsRoom>;
export type SocketServerChatRoom = SocketRoomWithInstance<SocketClientChatRoom>;
export type SocketServerRoom = SocketClientChatRoom | SocketServerAdminRoom | SocketServerMonitorRoom | SocketServerReportsRoom;

/**
 * Estrutura de dados para o status de relatórios de chats.
 */
export type ChatsReportStatusData = {
    id: number;
    type: "chats";
    isCompleted: false;
    isFailed: false;
    progress: number;
} | {
    id: number;
    type: "chats";
    isCompleted: true;
    isFailed: false;
    fileId: number;
    chats: number;
    messages: number;
} | {
    id: number;
    type: "chats";
    isCompleted: false;
    isFailed: true;
    error: string;
};

/**
 * Representa um código QR como uma string.
 */
export type QRCode = string;

/**
 * Representa o identificador de um chat.
 */
export type ChatId = number;

/**
 * Represents a function type for emitting events to specific rooms in a socket server.
 * This function type supports multiple overloads, each corresponding to a specific
 * combination of room type, event type, and value type.
 *
 * @typedef EmitFunction
 *
 * @overload
 * Emits a `NEW_CHAT` event to a chat or monitor room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, either a `SocketChatRoom` or `SocketMonitorRoom`.
 * @param event - The event type, `SocketEventType.NEW_CHAT`.
 * @param value - The value associated with the event (type not yet implemented).
 *
 * @overload
 * Emits a `CHAT_FINISHED` event to a chat or monitor room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, either a `SocketChatRoom` or `SocketMonitorRoom`.
 * @param event - The event type, `SocketEventType.CHAT_FINISHED`.
 * @param value - The ID of the finished chat.
 *
 * @overload
 * Emits a `QR_CODE` event to an admin room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, a `SocketAdminRoom`.
 * @param event - The event type, `SocketEventType.QR_CODE`.
 * @param value - The QR code data.
 *
 * @overload
 * Emits a `MESSAGE` event to a chat room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, a `SocketChatRoom`.
 * @param event - The event type, `SocketEventType.MESSAGE`.
 * @param value - The value associated with the event (type not yet implemented).
 *
 * @overload
 * Emits a `NOTIFICATION` event to an admin room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, a `SocketAdminRoom`.
 * @param event - The event type, `SocketEventType.NOTIFICATION`.
 * @param value - The value associated with the event (type not yet implemented).
 *
 * @overload
 * Emits a `MESSAGE_EDIT` event to a chat room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, a `SocketChatRoom`.
 * @param event - The event type, `SocketEventType.MESSAGE_EDIT`.
 * @param value - The value associated with the event (type not yet implemented).
 *
 * @overload
 * Emits a `MESSAGE_STATUS` event to a chat room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, a `SocketChatRoom`.
 * @param event - The event type, `SocketEventType.MESSAGE_STATUS`.
 * @param value - The value associated with the event (type not yet implemented).
 *
 * @overload
 * Emits a `REPORT_STATUS` event to an admin room.
 * @param instanceName - The name of the instance emitting the event.
 * @param room - The target room, a `SocketAdminRoom`.
 * @param event - The event type, `SocketEventType.REPORT_STATUS`.
 * @param value - The report status data.
 */
export type EmitFunction = {
    (
        instanceName: string,
        room: SocketServerAdminRoom,
        event: "qr_code",
        value: QRCode
    ): void;
    (
        instanceName: string,
        room: SocketServerAdminRoom,
        event: "notification",
        value: unknown
    ): void;
    (
        instanceName: string,
        room: SocketClientChatRoom | SocketServerMonitorRoom,
        event: "new_chat",
        value: unknown
    ): void;
    (
        instanceName: string,
        room: SocketClientChatRoom | SocketServerMonitorRoom,
        event: "chat_finished",
        value: ChatId
    ): void;
    (
        instanceName: string,
        room: SocketClientChatRoom,
        event: "message",
        value: unknown
    ): void;
    (
        instanceName: string,
        room: SocketClientChatRoom,
        event: "message_edit",
        value: unknown
    ): void;
    (
        instanceName: string,
        room: SocketClientChatRoom,
        event: "message_status",
        value: unknown
    ): void;
    (
        instanceName: string,
        room: SocketServerReportsRoom,
        event: "report_status",
        value: ChatsReportStatusData
    ): void;
};
