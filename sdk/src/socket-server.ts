import { PhoneNumber } from "@in.pulse-crm/utils";
import { AxiosInstance } from "axios";

/**
 * Tipos de eventos de socket.
 */
export enum SocketEventType {
    MESSAGE = "message",
    MESSAGE_EDIT = "message_edit",
    MESSAGE_STATUS = "message_status",
    NEW_CHAT = "new_chat",
    CHAT_FINISHED = "chat_finished",
    NOTIFICATION = "notification",
    QR_CODE = "qr_code",
    REPORT_STATUS = "report_status"
}

/**
 * Sala de chat, recebe todos eventos de um chat específico.
 */
export type SocketChatRoom = `chat:${PhoneNumber}`;

/**
 * Sala de administrador, recebe eventos de adminstrador de um setor específico.
 */
export type SocketAdminRoom = `sector:${SectorId}:admin`;

/**
 * Sala de monitoria, recebe eventos de monitoria de um setor específico.
 */
export type SocketMonitorRoom = `sector:${SectorId}:monitor`;

/**
 * Sala de relatórios, recebe eventos de um tipo relatório específico de um setor específico.
 */
export type SocketReportsRoom = `sector:${number}:reports:${string}`;

/**
 * Tipo de sala de socket.
 */
export type SocketRoomType = SocketChatRoom | SocketAdminRoom | SocketReportsRoom | SocketMonitorRoom;

/**
 * Ainda não implementado.
 */
export type NotImplemented = unknown;

/**
 * Dados de status de um relatório.
 */
export type ReportStatusData = {
    id: number;
    type: string;
    progress: number;
    isCompleted: true;
    isFailed: false;
    fileId: number;
} | {
    id: number;
    type: string;
    isCompleted: false;
    isFailed: true;
    error: string;
}

/**
 * String representando um QR Code.
 */
export type QRCode = string;

/**
 * Id de um chat.
 */
export type ChatId = number;

/**
 * Id de um setor.
 */
export type SectorId = number;

/**
 * Nome de uma instância.
 */
export type InstanceName = string;

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
        room: SocketChatRoom | SocketMonitorRoom,
        event: SocketEventType.NEW_CHAT,
        value: NotImplemented
    ): void;
    (
        instanceName: string,
        room: SocketChatRoom | SocketMonitorRoom,
        event: SocketEventType.CHAT_FINISHED,
        value: ChatId
    ): void;
    (
        instanceName: string,
        room: SocketAdminRoom,
        event: SocketEventType.QR_CODE,
        value: QRCode
    ): void;
    (
        instanceName: string,
        room: SocketChatRoom,
        event: SocketEventType.MESSAGE,
        value: NotImplemented
    ): void;
    (
        instanceName: string,
        room: SocketAdminRoom,
        event: SocketEventType.NOTIFICATION,
        value: NotImplemented
    ): void;
    (
        instanceName: string,
        room: SocketChatRoom,
        event: SocketEventType.MESSAGE_EDIT,
        value: NotImplemented
    ): void;
    (
        instanceName: string,
        room: SocketChatRoom,
        event: SocketEventType.MESSAGE_STATUS,
        value: NotImplemented
    ): void;
    (
        instanceName: string,
        room: SocketReportsRoom,
        event: SocketEventType.REPORT_STATUS,
        value: ReportStatusData
    ): void;
};

/**
 * Classe para manipulação de eventos de socket.
 */
export default class SocketServerSDK {

    constructor(private readonly httpClient: AxiosInstance) { }

    /**
     * Emite um evento de socket.
     * @param instanceName - O nome da instância.
     * @param room - A sala de destino.
     * @param event - O tipo do evento.
     * @param value - O valor do evento.
     */
    public emit: EmitFunction = async (instanceName, room, event, value) => {
        await this.httpClient.post(`/emit/${instanceName}/${room}/${event}`, value);
    }
}