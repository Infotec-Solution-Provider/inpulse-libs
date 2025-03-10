import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import type {
	DataResponse,
	PaginatedResponse,
	User,
	CreateUserDTO,
	UpdateUserDTO,
} from "@in.pulse-crm/types";

interface UserSDKOptions {
	axiosConfig: CreateAxiosDefaults;
}

class UserSDK {
	private readonly _api: AxiosInstance;

	constructor(props: UserSDKOptions) {
		this._api = axios.create(props.axiosConfig);
	}

	public async getUsers(instance: string) {
		const response = await this._api.get<PaginatedResponse<User>>(
			`/${instance}/users`,
		);

		return response.data;
	}

	public async getUserById(instance: string, userId: number) {
		const response = await this._api.get<DataResponse<User>>(
			`/${instance}/users/${userId}`,
		);

		return response.data;
	}

	public async createUser(instance: string, data: CreateUserDTO) {
		try {
			const response = await this._api.post<DataResponse<User>>(
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
			const response = await this._api.patch<DataResponse<User>>(
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
