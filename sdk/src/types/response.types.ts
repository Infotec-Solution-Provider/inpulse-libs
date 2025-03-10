export interface SuccessDataResponse<T> {
	message: string;
	data: T;
}

export type QueryResultResponse<T> = {
	result: T;
} 