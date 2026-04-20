import ApiClient from "./api-client";
import type { DataResponse } from "./types/response.types";
import type {
	AiAgentConfig,
	AiTenantConfig,
	AnalyzeCustomerRequest,
	AnalyzeCustomerResponse,
	SuggestResponseRequest,
	SuggestResponseResponse,
	SummarizeChatRequest,
	SummarizeChatResponse,
} from "./types/ai.types";

export default class AiClient extends ApiClient {
	private authHeader(token: string) {
		return { Authorization: `Bearer ${token}` };
	}

	async suggestResponse(data: SuggestResponseRequest, token: string): Promise<SuggestResponseResponse> {
		const { data: res } = await this.ax.post<DataResponse<SuggestResponseResponse>>(
			"/api/ai/completions/suggest-response",
			data,
			{ headers: this.authHeader(token) },
		);
		return res.data;
	}

	async summarizeChat(data: SummarizeChatRequest, token: string): Promise<SummarizeChatResponse> {
		const { data: res } = await this.ax.post<DataResponse<SummarizeChatResponse>>(
			"/api/ai/completions/summarize-chat",
			data,
			{ headers: this.authHeader(token) },
		);
		return res.data;
	}

	async analyzeCustomer(data: AnalyzeCustomerRequest, token: string): Promise<AnalyzeCustomerResponse> {
		const { data: res } = await this.ax.post<DataResponse<AnalyzeCustomerResponse>>(
			"/api/ai/completions/analyze-customer",
			data,
			{ headers: this.authHeader(token) },
		);
		return res.data;
	}

	async getTenantConfig(instance: string, token: string): Promise<AiTenantConfig> {
		const { data: res } = await this.ax.get<DataResponse<AiTenantConfig>>(
			`/api/ai/tenant-config/${instance}`,
			{ headers: this.authHeader(token) },
		);
		return res.data;
	}

	async upsertTenantConfig(
		instance: string,
		data: Partial<AiTenantConfig>,
		token: string,
	): Promise<AiTenantConfig> {
		const { data: res } = await this.ax.put<DataResponse<AiTenantConfig>>(
			`/api/ai/tenant-config/${instance}`,
			data,
			{ headers: this.authHeader(token) },
		);
		return res.data;
	}

	async getAgentConfig(instance: string, token: string): Promise<AiAgentConfig | null> {
		const { data: res } = await this.ax.get<DataResponse<AiAgentConfig | null>>(
			`/api/ai/agent-config/${instance}`,
			{ headers: this.authHeader(token) },
		);
		return res.data;
	}

	async upsertAgentConfig(
		instance: string,
		data: Partial<AiAgentConfig>,
		token: string,
	): Promise<AiAgentConfig> {
		const { data: res } = await this.ax.put<DataResponse<AiAgentConfig>>(
			`/api/ai/agent-config/${instance}`,
			data,
			{ headers: this.authHeader(token) },
		);
		return res.data;
	}
}
