import { AxiosInstance } from "axios";

export interface Customer {
    CODIGO: number;
    RAZAO: string;
    FANTASIA: string;
    PESSOA: 'FIS' | 'JUR' | null;
    ATIVO: 'SIM' | 'NAO' | null;
    CPF_CNPJ: string;
    IE_RG: string;
    GRUPO: number;
    END_RUA: string;
    CIDADE: string;
    BAIRRO: string;
    ESTADO: string;
    CEP: string;
    COMPLEMENTO: string;
    AREA1: number;
    AREA2: number;
    AREA3: number;
    AREAFAX: number;
    FONE1: string;
    FONE2: string;
    FONE3: string;
    FAX: string;
    DESC_FONE1: string;
    DESC_FONE2: string;
    DESC_FONE3: string;
    DESCFAX: string;
    EMAIL: string;
    WEBSITE: string;
    DATACAD: Date;
    STATUS_CAD: string;
    OBS_ADMIN: string;
    OBS_OPERADOR: string;
    ORIGEM: number;
    OPERADOR: number;
    COD_MIDIA: number;
    COD_ERP: string;
    BLOCK_COMPRAS: 'SIM' | 'NAO' | null;
    COD_UNIDADE: number;
    SALDO_DISPONIVEL: number;
    SALDO_LIMITE: number;
    POTENCIAL: number;
    DATA_ULT_COMPRA: Date;
    SEGMENTO: number;
    ULTI_RESULTADO: Date;
    DT_AGENDAMENTO: Date;
    COD_CAMPANHA: number;
    COD_RESULTADO: number;
    CONTATO_MAIL: string;
    ATUALIZADOR: 'CADASTRO' | 'ATUALIZAÇÃO' | null;
    OPERADOR_LOGIN: string;
    OBS_FONE1: string;
    OBS_FONE2: string;
    OBS_FONE3: string;
    NR_FUNCIONARIOS: number;
    EMAIL2: string;
    OBS_CLIENTES: string;
    VENCIMENTO_LIMITE_CREDITO: Date;
    PERIODO_RECOMPRA: number;
    DT_ULTIMO_ORCAMENTO_VENDA: Date;
    POSSUI_ORCAMENTO: 'S' | 'N' | null;
    POSSUI_VENDA: 'S' | 'N' | null;
    CODIGOPRINCIPAL: number;
    SETOR: number;
}

export type CreateCustomerDTO = Pick<Customer, "RAZAO" | "FANTASIA" | "CPF_CNPJ" | "PESSOA" | "CIDADE" | "ESTADO" | "COD_ERP">;
export type UpdateCustomerDTO = Partial<CreateCustomerDTO>;

class CustomerSDK {
    /**
     * Cria uma instância do SDK de usuários.
     * @param httpClient - A instância do cliente HTTP a ser usada para fazer requisições à API.
     */
    constructor(private readonly httpClient: AxiosInstance) { }

    /**
     * Cria um novo cliente.
     * @param data - Os dados do cliente a serem criados.
     * @returns Uma Promise que resolve para o cliente criado.
     */
    public async createCustomer(data: CreateCustomerDTO) {
        const response = await this.httpClient.post(`/customers`, data);

        return response.data;
    }

    /**
     * Obtém um cliente pelo ID.
     * @param customerId - O ID do cliente a ser obtido.
     * @returns Uma Promise que resolve para o cliente obtido.
     */
    public async getCustomerById(customerId: number) {
        const response = await this.httpClient.get(`/customers/${customerId}`);
        return response.data;
    }

    /**
     * Atualiza um cliente existente.
     * @param customerId - O ID do cliente a ser atualizado.
     * @param data - Os dados atualizados do cliente.
     * @returns Uma Promise que resolve para o cliente atualizado.
     */
    public async updateCustomer(customerId: number, data: UpdateCustomerDTO) {
        const response = await this.httpClient.patch(`/customers/${customerId}`, data);
        return response.data;
    }

    /**
     * Obtém todos os clientes.
     * 
     * @param filters - Filtros opcionais para a busca de clientes.
     * @todo Implementar tipagem para os filtros.
     * @returns Uma Promise que resolve para uma lista de clientes.
     */
    public async getAllCustomers(filters: Record<string, string>) {
        let baseUrl = `/customers`;
        const params = new URLSearchParams(filters);

        if (params.toString()) {
            baseUrl += `?${params.toString()}`;
        }

        const response = await this.httpClient.get(`/customers`);

        return response.data;
    }

    /**
     * Define o token de autenticação para as requisições.
     * @param token - O token de autenticação a ser definido.
     */
    public setAuth(token: string) {
        this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}

export default CustomerSDK;