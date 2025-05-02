import axios, { AxiosInstance, AxiosError } from 'axios';
import { ErrorResponse } from './types/response.types';

export default class ApiClient {
    protected readonly httpClient: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

        this.httpClient = axios.create({
            baseURL: `${this.baseUrl}`,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor() {
        this.httpClient.interceptors.response.use(
            null,
            this.handleError
        );
    }

    protected handleError = (error: AxiosError<ErrorResponse>): Promise<never> => {
        const errorMessage = error.response?.data?.message || error.message;
        return Promise.reject(new Error(errorMessage));
    };
}