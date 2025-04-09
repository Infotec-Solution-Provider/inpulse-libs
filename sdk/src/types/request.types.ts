export type RequestFilters<T> = {
	page?: string;
	perPage?: string;
	sortBy?: keyof T;
} & Record<keyof T, string>;
