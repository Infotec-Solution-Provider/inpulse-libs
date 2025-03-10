import {User} from "./user.types";

export interface SessionData {
    userId: number;
    role: string;
}

export interface LoginData {
    token: string;
    user: User;
}