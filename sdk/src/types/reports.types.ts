export type ReportType = "chats";
export type ChatsReportFormat = "txt" | "csv" | "pdf";
export type ChatsReportStatus = "pending" | "completed" | "failed";

export interface ChatsReport {
    id: number;
    userId: string;
    fileId: number;
    instance: string;
    startDate: string;
    endDate: string;
    exportDate: string;
    chats: number;
    messages: number;
    format: ChatsReportFormat;
    status: ChatsReportStatus;
}

export interface GenerateChatsReportOptions {
    userId: string;
    format: ChatsReportFormat;
    startDate: string;
    endDate: string;
}