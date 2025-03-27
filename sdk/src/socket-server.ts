import { AxiosInstance } from "axios";
import { EmitFunction } from "./types/socket-server.types";

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