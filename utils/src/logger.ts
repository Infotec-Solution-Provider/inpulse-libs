// @ts-ignore
import chalk from "chalk";

/**
 * Classe utilitária para imprimir mensagens no console com diferentes níveis de log.
 *
 * Níveis de log disponíveis:
 * - INFO: Mensagens de informação geral.
 * - ERROR: Mensagens de erro, com opção de informações de erro adicionais.
 * - DEBUG: Mensagens de debug, com opção de informações de debug adicionais.
 * - WARNING: Mensagens de aviso.
 *
 * Examplos de uso::
 * ```typescript
 * Logger.info("Aplicação iniciada.");
 * Logger.error("Ocorreu um erro", new Error("Exemplo de erro"));
 * Logger.debug("Debugando", { key: "value" });
 * Logger.warning("Atenção");
 * ```
 */
class Logger {

	/**
	 * Imprime uma mensagem no console com data/hora, o nível do log e uma mensagem definida.
	 *
	 * @param level - O nível do log (exemplo: "INFO", "ERROR"), que indica o tipo do log ou sua gravidade.
	 * @param message - A mensagem a ser impressa.
	 */
	private static logWithDate(level: string, message: string): void {
		const date = new Date().toLocaleString();

		console.log(`${chalk.green(date)} ${level} ${message}`);
	}

	/**
	 * Chama a função {@link logWithDate()} com o nível "INFO", imprimindo no console informações, uma mensagem e a data/hora.
	 *
	 * @param message - A mensagem a ser impressa.
	 */
	public static info(message: string): void {
		this.logWithDate(chalk.cyan("[INFO]"), `${message}`);
	}

	/**
	 * Chama a função {@link logWithDate()} com o nível "ERROR", imprimindo no console uma mensagem com data/hora, e opcionalmente os detalhes do erro.
	 *
	 * @param message - A mensagem a ser impressa.
	 * @param err - Parâmetro opcional. Um objeto "Error", contendo detalhes adicionais do erro.
	 */
	public static error(message: string, err?: Error): void {
		this.logWithDate(chalk.red("[ERROR]"), `${message}`);

		if (err) {
			console.error(err);
		}
	}

	/**
	 * Chama a função {@link logWithDate()} com o nível "DEBUG", imprimindo no console uma mensagem com data/hora, e opcionalmente um objeto para contexto adicional.
	 *
	 * @param message - A mensagem a ser impressa.
	 * @param object - Parâmetro opcional, Um objeto que, se providenciado, serve para imprimir informações adicionais no console.
	 */
	public static debug(message: string, object?: any): void {
		this.logWithDate(chalk.blue("[DEBUG]"), `${message}`);

		if (object) {
			console.log(object);
		}
	}

	/**
	 * Chama a função {@link logWithDate()} com o nível "WARNING", imprimindo no console uma mensagem com data/hora.
	 *
	 * @param message - A mensagem a ser impressa.
	 */
	public static warning(message: string): void {
		this.logWithDate(chalk.yellow("[WARNING]"), `${message}`);
	}
}

export default Logger;
