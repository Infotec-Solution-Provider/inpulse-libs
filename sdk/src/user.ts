import { AxiosInstance } from "axios";
import { DataResponse, PaginatedResponse } from "./response";

/**
 * Enum que representa os diferentes papéis de usuário dentro do sistema.
 * 
 * @enum {string}
 * @property {string} ADMIN - Representa um papel de administrador.
 * @property {string} ACTIVE - Representa um papel de usuário ativo.
 * @property {string} RECEPTIONIST - Representa um papel de recepcionista.
 * @property {string} BOTH - Representa um papel que combina tanto recepcionista quanto usuário ativo.
 */
export enum UserRole {
    ADMIN = "ADMIN",
    ACTIVE = "ATIVO",
    RECEPTIONIST = "RECEP",
    BOTH = "AMBOS",
}

/**
 * Interface que representa um usuário do Inpulse.
 */
export interface User {
    /** Código do usuário */
    CODIGO: number;
    /** Indica se o usuário está ativo */
    ATIVO: "SIM" | "NAO" | null;
    /** Nome do usuário */
    NOME: string;
    /** Login do usuário */
    LOGIN: string;
    /** Email do usuário */
    EMAIl: string;
    /** Nível de acesso do usuário */
    NIVEL: UserRole | null;
    /** Horário de trabalho do usuário */
    HORARIO: number;
    /** Data de cadastro do usuário */
    DATACAD: Date | null;
    /** Código do setor do usuário */
    SETOR: number;
    /** Nome de exibição do usuário */
    NOME_EXIBICAO: string | null;
    /** Código ERP do usuário */
    CODIGO_ERP: string;
    /** Nome do setor do usuário */
    SETOR_NOME: string;
    /** Senha do usuário */
    SENHA?: string | null;
    /** Data de expiração da senha do usuário */
    EXPIRA_EM: Date | null;
    /** Indica se o usuário deve alterar a senha */
    ALTERA_SENHA: "SIM" | "NAO" | null;
    /** Indica se o usuário pode editar contatos */
    EDITA_CONTATOS: "SIM" | "NAO" | null;
    /** Indica se o usuário pode visualizar compras */
    VISUALIZA_COMPRAS: "SIM" | "NAO" | null;
    /** Tipo de cadastro do usuário */
    CADASTRO: "TOTAL" | "NULOS" | null;
    /** Indica se o usuário está logado */
    LOGADO: number | null;
    /** Data e hora do início do último login */
    ULTIMO_LOGIN_INI: Date | null;
    /** Data e hora do fim do último login */
    ULTIMO_LOGIN_FIM: Date | null;
    /** Código de telefonia do usuário */
    CODTELEFONIA: string;
    /** Indica se o usuário agenda ligações */
    AGENDA_LIG: "SIM" | "NAO";
    /** Indica se o usuário liga para representantes */
    LIGA_REPRESENTANTE: "SIM" | "NAO";
    /** Banco do usuário */
    BANCO: string;
    /** Indica se o usuário filtra por DDD */
    FILTRA_DDD: "SIM" | "NAO";
    /** Indica se o usuário filtra por estado */
    FILTRA_ESTADO: "SIM" | "NAO";
    /** Ramal do Asterisk do usuário */
    ASTERISK_RAMAL: string | null;
    /** UserID do Asterisk do usuário */
    ASTERISK_USERID: string | null;
    /** Login do Asterisk do usuário */
    ASTERISK_LOGIN: string | null;
    /** Senha do Asterisk do usuário */
    ASTERISK_SENHA: string | null;
    /** Codec do Asterisk do usuário */
    CODEC: string | null;
    /** Assinatura de email do usuário */
    ASSINATURA_EMAIL: string | null;
    /** Dias para ligar para representantes */
    LIGA_REPRESENTANTE_DIAS: number | null;
    /** Email do operador */
    EMAILOPERADOR: string | null;
    /** Senha do email do operador */
    SENHAEMAILOPERADOR: string | null;
    /** Email de exibição do usuário */
    EMAIL_EXIBICAO: string | null;
    /** Limite diário de agendamento */
    limite_diario_agendamento: number | null;
    /** Indica se o usuário é omni */
    OMNI: number | null;
    /** Caminho do banco de dados */
    CAMINHO_DATABASE: string | null;
    /** ID da campanha WeOn */
    IDCAMPANHA_WEON: string | null;
}

/**
 * Interface que representa o objeto de transferência de dados para criar um usuário.
 */
export interface CreateUserDTO {
    /**
     * O nome do usuário.
     */
    NOME: string;

    /**
     * O nome de usuário para login.
     */
    LOGIN: string;

    /**
     * A senha do usuário.
     */
    SENHA: string;

    /**
     * O nível de acesso do usuário.
     * Pode ser um dos seguintes valores:
     * - "ATIVO"
     * - "RECEP"
     * - "AMBOS"
     * - "ADMIN"
     */
    NIVEL: UserRole;

    /**
     * O número do setor do usuário.
     */
    SETOR: number;

    /**
     * O endereço de email do usuário (opcional).
     */
    EMAIL?: string;

    /**
     * O nome de exibição do usuário (opcional).
     */
    NOME_EXIBICAO?: string;

    /**
     * O código ERP do usuário (opcional).
     */
    CODIGO_ERP?: string;
}

/**
 * Interface que representa o objeto de transferência de dados para atualizar um usuário.
 */
export type UpdateUserDTO = Partial<CreateUserDTO>;

/**
 * SDK para operações de usuários.
 */
class UserSDK {
    /**
     * Cria uma instância do SDK de usuários.
     * @param httpClient - A instância do cliente HTTP a ser usada para fazer requisições à API.
     */
    constructor(private readonly httpClient: AxiosInstance) { }

    /**
     * Obtém a lista de usuários.
     * @param instance - O nome da instância.
     * @returns Uma resposta paginada contendo os usuários.
     */
    public async getUsers(instance: string) {
        const response = await this.httpClient.get<PaginatedResponse<User>>(
            `/${instance}/users`,
        );

        return response.data;
    }

    /**
     * Obtém um usuário pelo ID.
     * @param instance - O nome da instância.
     * @param userId - O ID do usuário.
     * @returns Uma resposta contendo os dados do usuário.
     */
    public async getUserById(instance: string, userId: number) {
        const response = await this.httpClient.get<DataResponse<User>>(
            `/${instance}/users/${userId}`,
        );

        return response.data;
    }

    /**
     * Cria um novo usuário.
     * @param instance - O nome da instância.
     * @param data - Os dados para criação do usuário.
     * @returns Uma resposta contendo os dados do usuário criado.
     * @throws Um erro se a criação do usuário falhar.
     */
    public async createUser(instance: string, data: CreateUserDTO) {
        try {
            const response = await this.httpClient.post<DataResponse<User>>(
                `/${instance}/users`,
                data,
            );

            return response.data;
        } catch (error) {
            throw new Error("Failed to create user", { cause: error });
        }
    }

    /**
     * Atualiza um usuário existente.
     * @param instance - O nome da instância.
     * @param userId - O ID do usuário.
     * @param data - Os dados para atualização do usuário.
     * @returns Uma resposta contendo os dados do usuário atualizado.
     * @throws Um erro se a atualização do usuário falhar.
     */
    public async updateUser(
        instance: string,
        userId: string,
        data: UpdateUserDTO,
    ) {
        try {
            const response = await this.httpClient.patch<DataResponse<User>>(
                `/${instance}/users/${userId}`,
                data,
            );

            return response.data;
        } catch (error) {
            throw new Error("Failed to update user", { cause: error });
        }
    }
}

export default UserSDK;
