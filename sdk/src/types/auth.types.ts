import { User } from "./user.types";

export interface LoginData {
    /**
     * Token de autenticação.
     */
    token: string;
    /**
     * Dados do usuário.
     */
    user: User;
}

export interface SessionData {
    /**
     * ID do usuário.
     */
    userId: number;
    /**
     * ID do setor do usuário.
     */
    sectorId: number
    /**
     * Papel do usuário.
     */
    role: string;
    /**
     * Nome da instância.
     */
    instance: string;
}