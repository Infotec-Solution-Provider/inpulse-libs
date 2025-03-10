import { CreateAxiosDefaults } from "axios";
import { User } from "./user.types";

export interface AuthSDKOptions {
	axiosConfig: CreateAxiosDefaults;
}

export interface SessionData {
	userId: number;
	role: string;
}

export interface LoginData {
	token: string;
	user: User;
}
