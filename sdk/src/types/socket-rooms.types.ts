type ReportType = "chats";
type PhoneNumber = string;

/* 
    Salas de Socket do lado do cliente;
    Essas salas omitem o nome da instancia e/ou id do setor,
    pois isso é controlado pelo servidor;
*/
export type SocketClientChatRoom = `chat:${PhoneNumber}`;
export type SocketClientAdminRoom = "admin";
export type SocketClientMonitorRoom = `monitor`;
export type SocketClientReportsRoom = `reports:${ReportType}`;
export type SocketClientRoom =
	| SocketClientChatRoom
	| SocketClientAdminRoom
	| SocketClientReportsRoom
	| SocketClientMonitorRoom;

// Interface que incluí o nome da instancia na sala de socket;
type SocketRoomWithInstance<T extends string> = `${string}:${T}`;

// Interface que incluí o nome da instancia e o id do setor na sala de socket;
type SocketRoomWithSector<T extends string> =
	SocketRoomWithInstance<`${number}:${T}`>;

/* 
    Salas de Socket do lado do servidor;
    Essas salas incluem o nome da instancia e o id do setor,
    Permitindo que cada instancia consiga ver apenas o que lhe
    pertence, e não as salas de outras instancias.
*/
export type SocketServerAdminRoom = SocketRoomWithSector<SocketClientAdminRoom>;
export type SocketServerMonitorRoom =
	SocketRoomWithSector<SocketClientMonitorRoom>;
export type SocketServerReportsRoom =
	SocketRoomWithSector<SocketClientReportsRoom>;
export type SocketServerChatRoom = SocketRoomWithInstance<SocketClientChatRoom>;
export type SocketServerRoom =
	| SocketServerChatRoom
	| SocketServerAdminRoom
	| SocketServerMonitorRoom
	| SocketServerReportsRoom;

export interface JoinRoomFn {
	(room: SocketClientRoom): void;
}
