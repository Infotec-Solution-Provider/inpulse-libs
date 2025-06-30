import axios, { AxiosInstance, AxiosError } from 'axios';
import { ErrorResponse } from './types/response.types';

export default class ApiClient {
    public readonly ax: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

        this.ax = axios.create({
            baseURL: `${this.baseUrl}`,
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor() {
        this.ax.interceptors.response.use(
            null,
            this.handleError
        );
    }

    protected handleError = (error: AxiosError<ErrorResponse>): Promise<never> => {
        const errorMessage = error.response?.data?.message || error.message;
        return Promise.reject(new Error(errorMessage));
    };
}