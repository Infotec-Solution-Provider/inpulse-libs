export interface DataResponse<T> {
    message: string;
    data: T;
}

export interface PaginatedResponse<T> {
    message: string;
    data: Array<T>;
    page: {
        current: number;
        next: boolean;
    }
}

export interface QueryResponse<T> {
    result: T;
}

export interface ErrorResponse {
    message: string;
    cause?: any;
}