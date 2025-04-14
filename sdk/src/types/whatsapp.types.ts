export type WppMessageStatus =
	| "PENDING"
	| "SENT"
	| "RECEIVED"
	| "READ"
	| "DOWNLOADED"
	| "ERROR";
    
export interface WppMessage {
	instanceName: string;
	id: string;
	from: string;
	to: string;
	type: string;
	quotedId: string | null;
	chatId: number | null;
	body: string;
	timestamp: bigint;
	status: WppMessageStatus;
	fileId: number | null;
	fileName: string | null;
	fileType: string | null;
	fileSize: bigint | null;
}
