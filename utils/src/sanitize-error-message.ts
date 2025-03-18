import { AxiosError } from "axios";

/**
 * Extrai e limpa a mensagem de erro de um objeto de erro Axios.
 *
 * @param err - O objeto de erro Axios a ser limpo.
 * @returns A mensagem de erro limpa, se disponível, ou "null", caso não seja encontrado uma mensagem.
 */
function sanitizeAxiosErrorMessage(err: AxiosError<any>) {
    if (err.response && err.response.data && typeof err.response.data?.message === "string") {
        return err.response.data.message as string;
    }

    return err.message || null;
}

/**
 * Limpa uma mensagem de erro, extraindo uma mensagem significativa do objeto de erro providenciado.
 *
 * @param err - O objeto de erro a ser limpo.
 * @returns Se disponível retorna uma mensagem de erro limpa, ou "null", se não foi possível extrair nenhuma mensagem.
 *
 * @remarks - Se o erro for uma instancia de "AxiosError", é mandado para ser processado com {@link sanitizeAxiosErrorMessage()}.
 */
function sanitizeErrorMessage(err: any) {
    if (err instanceof AxiosError) {
        return sanitizeAxiosErrorMessage(err);
    }
    if (err instanceof Error) {
        return err.message || null;
    }

    return null;
}

export default sanitizeErrorMessage;