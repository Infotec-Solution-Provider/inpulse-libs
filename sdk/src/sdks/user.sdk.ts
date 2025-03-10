import axios, { AxiosInstance } from "axios";
import {
	User,
	UserSDKOptions,
	CreateUserDTO,
	UpdateUserDTO,
} from "../types/user.types";
import { SuccessDataResponse } from "../types/response.types";

class UserSDK {
	private readonly _api: AxiosInstance;

	constructor(props: UserSDKOptions) {
		this._api = axios.create(props.axiosConfig);
	}

	public async getUsers(instance: string) {
		const response = await this._api.get<Array<User>>(`/${instance}/users`);

		return response.data;
	}

	public async getUserById(instance: string, userId: number) {
		const response = await this._api.get<User>(
			`/${instance}/users/${userId}`,
		);

		return response.data;
	}

	public async createUser(instance: string, data: CreateUserDTO) {
		try {
			const response = await this._api.post<SuccessDataResponse<User>>(
				`/${instance}/users`,
				data,
			);

			return response.data;
		} catch (error) {
			throw new Error("Failed to create user", { cause: error });
		}
	}

	public async updateUser(
		instance: string,
		userId: string,
		data: UpdateUserDTO,
	) {
		try {
			const response = await this._api.patch<SuccessDataResponse<User>>(
				`/${instance}/users/${userId}`,
				data,
			);

			return response.data;
		} catch (error) {
			throw new Error("Failed to update user", { cause: error });
		}
	}
}

export default UserSDK;
