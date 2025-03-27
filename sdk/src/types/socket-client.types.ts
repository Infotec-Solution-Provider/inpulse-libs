import { PhoneNumber } from "@in.pulse-crm/utils";
import { ReportType } from "../report";
import type { ChatsReportStatusData, QRCode } from "./socket-server.types";

/**
 * Representa uma sala de chat identificada por um número de telefone.
 */
export type SocketClientChatRoom = `chat:${PhoneNumber}`;

/**
 * Representa a sala de administração.
 */
export type SocketClientAdminRoom = "admin";

/**
 * Representa a sala de monitoramento.
 */
export type SocketClientMonitorRoom = `monitor`;

/**
 * Representa uma sala de relatórios identificada por um tipo de relatório.
 */
export type SocketClientReportsRoom = `reports:${ReportType}`;

/**
 * Representa as salas disponíveis para clientes, incluindo chat, administração, relatórios e monitoramento.
 */
export type SocketClientRoom = SocketClientChatRoom | SocketClientAdminRoom | SocketClientReportsRoom | SocketClientMonitorRoom;

/**
 * Função para entrar em uma sala de socket.
 */
export type JoinRoomFunction = {
    (room: SocketClientRoom): void;
};

/**
 * Função para entrar em um chat de socket.
 */
export type JoinChatFunction = {
    (phone: PhoneNumber): void;
};

/**
 * Função para sair de uma sala de socket.
 */
export type LeaveRoomFunction = {
    (room: SocketClientRoom): void;
};

/**
 * Função para sair de um chat de socket.
 */
export type LeaveChatFunction = {
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
    (event: "message", listener: (data: unknown) => void): void;

    /**
     * Escuta evento de edição de mensagem
     * Ainda não implementado.
     */
    (event: "message_edit", listener: (data: unknown) => void): void;

    /**
     * Escuta evento de status de mensagem
     * Ainda não implementado.
     */
    (event: "message_status", listener: (data: unknown) => void): void;

    /**
     * Escuta evento de novo chat
     * Ainda não implementado.
     */
    (event: "new_chat", listener: (data: unknown) => void): void;

    /**
     * Escuta evento de chat finalizado
     * @trigger Quando um chat é finalizado
     * @target Sala de monitoria e ao atendente do chat
     * @data Um número contendo o ID do chat finalizado
     */
    (event: "chat_finished", listener: (chatId: number) => void): void;

    /**
     * Escuta evento de notificação
     * @trigger Quando uma notificação é enviada
     * @target Sala de administração do setor
     */
    (event: "notification", listener: (notification: unknown) => void): void;

    /**
     * Escuta evento de QR Code
     * @trigger Quando um QR Code é gerado
     * @target Sala de administração do setor
     */
    (event: "qr_code", listener: (qr: QRCode) => void): void;

    /**
     * Escuta evento de status de relatório
     * @trigger Quando o status de um relatório é atualizado
     * @target Sala de relatórios
     */
    (event: "report_status", listener: (data: ChatsReportStatusData) => void): void;
}