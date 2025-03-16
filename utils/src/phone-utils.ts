
/**
 * Representa um número de telefone válido (apenas digitos).
 */
export type PhoneNumber = string;
/**
 * Representa um número de telefone formatado.0
 */
export type FormattedPhoneNumber = string;

/**
 * Classe com métodos para manipulação de números de telefone.
 */
class PhoneUtils {
    /**
     * Valida se o número de telefone fornecido é válido.
     * Um número de telefone válido contém apenas dígitos e tem um comprimento entre 10 e 13.
     * 
     * @param phone - O número de telefone a ser validado.
     * @returns Um booleano indicando se o número de telefone é válido.
     */
    public static isValid(phone: string): phone is PhoneNumber {
        return /^\d{10,13}$/.test(phone);
    }

    /**
     * Formata um número de telefone para melhor visualização.
     * 
     * @param phone - O número a ser formatado.
     * @returns O número formatado.
     * @throws Se o número de telefone for inválido.
     */
    public static format(phone: string): FormattedPhoneNumber {
        phone = phone.replace(/\D/g, "");

        if (!PhoneUtils.isValid(phone)) {
            throw new Error("Invalid phone number.");
        }

        switch (phone.length) {
            case 13:
                return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone[4]} ${phone.slice(5, 9)}-${phone.slice(9, 13)}`;
            case 12:
                return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone.slice(4, 8)}-${phone.slice(8, 12)}`;
            case 11:
                return `(${phone.slice(0, 2)}) ${phone[2]} ${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
            case 10:
                return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`;
            default:
                throw new Error("Invalid phone number.");
        }
    }
}

export default PhoneUtils;