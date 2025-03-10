import axios, { AxiosInstance } from "axios";
import { AuthSDKOptions, LoginData, SessionData } from "../types/auth.types";
import { SuccessDataResponse } from "../types/response.types";

class AuthSDK {
	private readonly _api: AxiosInstance;

	constructor(props: AuthSDKOptions) {
		this._api = axios.create(props.axiosConfig);
	}

	public async login(instance: string, login: string, password: string) {
		const response = await this._api.post<SuccessDataResponse<LoginData>>(
			`${instance}/login`,
			{ LOGIN: login, SENHA: password },
		);


	}

	public async fetchSessionData(instance: string, token: string) {
		const response = await this._api
			.get<SuccessDataResponse<SessionData>>(`/${instance}/auth`, {
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

		return response.data.data;
	}

	public async isAuthenticated(instance: string, token: string) {
		try {
			await this.fetchSessionData(instance, token);

			return true;
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
			const session = await this.fetchSessionData(instance, token);

			return authorizedRoles.includes(session.role);
		} catch {
			return false;
		}
	}
}

export default AuthSDK;
