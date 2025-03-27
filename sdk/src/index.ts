import AuthSDK, { LoginData, SessionData } from "./auth";
import FileSDK, { File, FileDirType } from "./file";
import InstanceSDK from "./instance";
import UserSDK, { CreateUserDTO, UpdateUserDTO, User, UserRole } from "./user";
import { DataResponse, ErrorResponse, PaginatedResponse, QueryResponse } from "./response";
import ReportSDK, { ChatsReport, ChatsReportFormat, GenerateChatsReportOptions } from "./report";
import SocketClientSDK from "./socket-client";
import SocketServerSDK from "./socket-server";
import {
    EmitFunction,
    ChatsReportStatusData,
    SocketServerAdminRoom,
    SocketServerMonitorRoom,
    SocketServerReportsRoom,
    SocketServerRoom,
    ChatId,
    QRCode,
    SocketEventType,
} from "./types/socket-server.types";
import {
    SocketClientChatRoom,
    SocketClientAdminRoom,
    SocketClientMonitorRoom,
    SocketClientReportsRoom,
    SocketClientRoom,
} from "./types/socket-client.types";

export {
    // Auth
    AuthSDK,
    LoginData,
    SessionData,

    // File
    FileSDK,
    File,
    FileDirType,

    // Instance
    InstanceSDK,

    // User
    UserSDK,
    CreateUserDTO,
    UpdateUserDTO,
    User,
    UserRole,

    // Response
    DataResponse,
    ErrorResponse,
    PaginatedResponse,
    QueryResponse,

    // Report
    ReportSDK,
    ChatsReport,
    ChatsReportFormat as ChatsReportFileFormat,
    GenerateChatsReportOptions,

    // Socket Client
    SocketClientSDK,
    SocketClientChatRoom as SocketChatRoom,
    SocketClientAdminRoom,
    SocketClientMonitorRoom,
    SocketClientReportsRoom,
    SocketClientRoom,

    // Socket Server
    SocketServerSDK,
    EmitFunction,
    SocketEventType,
    ChatsReportStatusData,
    SocketServerAdminRoom,
    SocketServerMonitorRoom,
    SocketServerReportsRoom,
    SocketServerRoom,
    ChatId,
    QRCode,
};
