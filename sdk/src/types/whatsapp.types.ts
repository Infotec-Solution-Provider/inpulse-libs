export enum WppMessageStatus {
	PENDING = "PENDING",
	SENT = "SENT",
	RECEIVED = "RECEIVED",
	READ = "READ",
	DOWNLOADED = "DOWNLOADED",
	ERROR = "ERROR",
}

export interface WppMessage {
	id: string;
	from: string;
	type: string;
	chatId: number;
	quotedId?: string;
	body: string;
	timestamp: bigint;
	status: WppMessageStatus;
}
