import formatDate from "./format-date";
import formatDateSql from "./format-date-sql";
import formatPhone from "./format-phone";

class Formatter {
  /**
   * Formata uma data para uma string local.
   * @param date - A data a ser formatada. Pode ser um objeto Date, uma string ou um número.
   * @returns A data formatada como string local.
   */
  public static date(date: Date | string | number): string {
    return formatDate(date);
  }

  /**
   * Formata uma data para o formato SQL.
   * @param date - A data a ser formatada. Pode ser um objeto Date, uma string ou um número.
   * @returns A data formatada no formato SQL (YYYY-MM-DD HH:mm:ss).
   */
  public static dateSql(date: Date | string | number): string {
    return formatDateSql(date);
  }

  /**
   * Formata um número de telefone.
   * @param phone - O número de telefone a ser formatado.
   * @returns O número de telefone formatado.
   */
  public phone(phone: string): string {
    return formatPhone(phone);
  }
}

export default Formatter;
