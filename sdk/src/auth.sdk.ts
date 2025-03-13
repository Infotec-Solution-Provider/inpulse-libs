import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { DataResponse, LoginData, SessionData, User } from "@in.pulse-crm/types";
import { sanitizeErrorMessage } from "@in.pulse-crm/utils";

interface AuthSDKOptions {
	axiosConfig: CreateAxiosDefaults;
}

class AuthSDK {
	private readonly _api: AxiosInstance;

	constructor(props: AuthSDKOptions) {
		this._api = axios.create(props.axiosConfig);
	}

	public async login(instance: string, login: string, password: string) {
		const response = await this._api.post<DataResponse<LoginData>>(
			`${instance}/login`,
			{ LOGIN: login, SENHA: password },
		);

		return response.data;
	}

	public async fetchSessionData(instance: string, token: string) {
		const response = await this._api
			.get<DataResponse<SessionData>>(`/${instance}/auth`, {
				headers: {
					authorization: token,
				},
			})
			.catch((error) => {
				const message = sanitizeErrorMessage(error);
				throw new Error("Failed to fetch session data! " + message);
			});

		return response.data;
	}

	public async fetchSessionUser(instance: string, token: string) {
		const response = await this._api
			.get<DataResponse<User>>(`/${instance}/auth/user`, {
				headers: {
					authorization: token,
				},
			})
			.catch((error) => {
				const message = sanitizeErrorMessage(error);
				throw new Error("Failed to fetch session user! " + message);
			});

		return response.data;
	}

	public async isAuthenticated(instance: string, token: string) {
		try {
			const { data } = await this.fetchSessionData(instance, token);

			return !!data.userId;
		} catch {
			return false;
		}
	}

	public async isAuthorized(
		instance: string,
		token: string,
		authorizedRoles: string[],
	) {
		try {
			const { data } = await this.fetchSessionData(instance, token);

			return authorizedRoles.includes(data.role);
		} catch {
			return false;
		}
	}
}

export default AuthSDK;
