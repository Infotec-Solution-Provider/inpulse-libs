import { Socket } from "socket.io-client";
import { JoinChatFunction, JoinRoomFunction, LeaveChatFunction, LeaveRoomFunction, ListenEventFunction } from "./types/socket-client.types";

/**
 * Classe para consumo dos eventos de socket.
 */
export default class SocketClientSDK {
    constructor(private readonly io: Socket) { }

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
     * Escuta eventos de socket.
     * 
     * @param event - O tipo de evento a ser escutado.
     * @param listener - A função a ser chamada quando o evento ocorrer.
     */
    public off: ListenEventFunction = (event, listener) => {
        this.io.off(event, listener);
    }

    /**
     * Entra em uma sala de socket.
     * 
     * @param room - O tipo de sala a ser ingressada.
     */
    public joinRoom: JoinRoomFunction = (room) => {
        this.io.emit("join-room", `${room}`);
    }

    /**
     * Entra em um chat.
     * 
     * @param phone - O número de telefone do chat a ser ingressado.
     */
    public joinChat: JoinChatFunction = (phone) => {
        this.joinRoom(`chat:${phone}`);
    }

    /**
     * Sai de uma sala de socket.
     * 
     * @param room - O tipo de sala a ser deixada.
     * @description Remove o cliente da sala especificada no servidor de socket.
     */
    public leaveRoom: LeaveRoomFunction = (room) => {
        this.io.emit("leave-room", `${room}`);
    }

    /**
     * Sai de um chat.
     * 
     * @param phone - O número de telefone do chat a ser deixado.
     * @description Remove o cliente do chat especificado, utilizando o número de telefone.
     */
    public leaveChat: LeaveChatFunction = (phone) => {
        this.leaveRoom(`chat:${phone}`);
    }

    /**
     * Define o token de autenticação para o socket.
     * 
     * @param token - O token de autenticação.
     * @description Configura o token de autenticação para ser enviado em todas as conexões de socket subsequentes.
     *              Se o token for nulo ou vazio, a autenticação será removida.
     */
    public setAuth(token: string) {
        this.io.auth = { token: token ? `Bearer ${token}` : null };
    }
}