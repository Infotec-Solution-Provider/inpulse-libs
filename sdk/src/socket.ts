import { Socket } from "socket.io-client";
import { PhoneNumber } from "@in.pulse-crm/utils";

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
 * Sala de relatórios de chat, recebe eventos de relatórios de chat de um setor específico.
 */
export type SocketChatReportsRoom = `sector:${SectorId}:chat_reports`;

/**
 * Tipo de sala de socket.
 */
export type SocketRoomType = SocketChatRoom | SocketAdminRoom | SocketChatReportsRoom;

/**
 * Ainda não implementado.
 */
export type NotImplemented = never;

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
 * Função para entrar em uma sala de socket.
 */
export type JoinRoomFunction = {
    (room: SocketRoomType): void;
};

/**
 * Função para entrar em um chat de socket.
 */
export type JoinChatFunction = {
    (phone: PhoneNumber): void;
};

/**
 * Função para escutar eventos de socket.
 */
export type ListenEventFunction = {
    /**
     * Escuta evento de mensagem
     * Ainda não implementado.
     */
    (event: SocketEventType.MESSAGE, listener: (data: NotImplemented) => void): void;

    /**
     * Escuta evento de edição de mensagem
     * Ainda não implementado.
     */
    (event: SocketEventType.MESSAGE_EDIT, listener: (data: NotImplemented) => void): void;

    /**
     * Escuta evento de status de mensagem
     * Ainda não implementado.
     */
    (event: SocketEventType.MESSAGE_STATUS, listener: (data: NotImplemented) => void): void;

    /**
     * Escuta evento de novo chat
     * Ainda não implementado.
     */
    (event: SocketEventType.NEW_CHAT, listener: (data: NotImplemented) => void): void;

    /**
     * Escuta evento de chat finalizado
     * @trigger Quando um chat é finalizado
     * @target Sala de monitoria e ao atendente do chat
     * @data Um número contendo o ID do chat finalizado
     */
    (event: SocketEventType.CHAT_FINISHED, listener: (chatId: ChatId) => void): void;

    /**
     * Escuta evento de notificação
     * @trigger Quando uma notificação é enviada
     * @target Sala de administração do setor
     */
    (event: SocketEventType.NOTIFICATION, listener: (notification: NotImplemented) => void): void;

    /**
     * Escuta evento de QR Code
     * @trigger Quando um QR Code é gerado
     * @target Sala de administração do setor
     */
    (event: SocketEventType.QR_CODE, listener: (qr: QRCode) => void): void;
}

/**
 * Classe para manipulação de sockets.
 */
export default class SocketSDK {
    constructor(private readonly io: Socket) {

        this.on(SocketEventType.CHAT_FINISHED, (chatId) => {
            console.log(`Chat ${chatId} finalizado.`);
        });
    }

    /**
     * Escuta eventos de socket.
     * 
     * @param event - O tipo de evento a ser escutado.
     * @param listener - A função a ser chamada quando o evento ocorrer.
     */
    public on: ListenEventFunction = (event, listener) => {
        this.io.on(event, listener);
    }

    /**
     * Entra em uma sala de socket.
     * 
     * @param room - O tipo de sala a ser ingressada.
     */
    public joinRoom: JoinRoomFunction = (room) => {
        this.io.emit("join", `${room}`);
    }

    /**
     * Entra em um chat de socket.
     * 
     * @param phone - O número de telefone do chat a ser ingressado.
     */
    public joinChat: JoinChatFunction = (phone) => {
        this.io.emit("join", `chat:${phone}`);
    }

    /**
     * Define o token de autenticação para o socket.
     * 
     * @param token - O token de autenticação.
     */
    public setAuth(token: string) {
        this.io.auth = { token: token ? `Bearer ${token}` : null };
    }
}