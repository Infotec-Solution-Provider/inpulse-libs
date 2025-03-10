import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { DataResponse, LoginData, SessionData } from "@in.pulse-crm/types";

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
				console.error(error.response?.data?.error);

				if (error.response?.data?.message) {
					throw new Error(error.response.data.message);
				}
				if (error.response?.status) {
					throw new Error(
						`Failed to authenticate, status: ${error.response.status}`,
					);
				}
				throw new Error(error.message);
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
