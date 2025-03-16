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
    QR_CODE = "qr_code"
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
 * Sala de relatórios de chat, recebe eventos de relatórios de chat de um setor específico.
 */
export type SocketChatReportsRoom = `sector:${SectorId}:chat_reports`;

/**
 * Tipo de sala de socket.
 */
export type SocketRoomType = SocketChatRoom | SocketAdminRoom | SocketChatReportsRoom | SocketMonitorRoom;

/**
 * Ainda não implementado.
 */
export type NotImplemented = unknown;

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