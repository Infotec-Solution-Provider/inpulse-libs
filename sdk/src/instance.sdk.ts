import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { QueryResponse } from "@in.pulse-crm/types";

interface InstanceSDKOptions {
	axiosConfig: CreateAxiosDefaults;
}

class InstanceSDK {
	private readonly _api: AxiosInstance;

	constructor(props: InstanceSDKOptions) {
		this._api = axios.create(props.axiosConfig);
	}

	public async executeQuery<T>(
		instance: string,
		query: string,
		parameters: Array<any>,
	) {
		const response = await this._api
			.post<QueryResponse<T>>(`/${instance}/query`, { query, parameters })
			.catch((error) => {
				if (error.response?.data?.message) {
					throw new Error(error.response.data.message);
				}
				if (error.response?.status) {
					throw new Error(
						`Failed to execute query, status: ${error.response.status}`,
					);
				}
				throw new Error(error.message);
			});

		return response.data.result;
	}
}

export default InstanceSDK;
