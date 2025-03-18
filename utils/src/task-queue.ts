/**
 * As opções para se configurar a task queue.
 *
 * @property concurrency - O número máximo de "tasks" que podem ser processadas simultaneamente.
 * @property onTaskCompleted - Callback opcional invocada quando uma tarefa é concluída com sucesso. Recebe o resultado da task concluída como argumento.
 * @property onTaskFailed - Callback opcional invocada quando uma tarefa falha. Recebe o erro lançado pela task falhada como argumento.
 */
interface TaskQueueOptions<T> {
	concurrency: number;
	onTaskCompleted?: (result: T) => void;
	onTaskFailed?: (error: unknown) => void;
}

/**
 * Uma fila de tarefas ("tasks") genérica que administra a execução de tarefas assíncronas com um limite de simultaneidade especificado.
 *
 * @remarks
 * - As tarefas são executadas na ordem em que são adicionadas à fila.
 * - O número de tarefas sendo executadas simultaneamente é limitado pelo valor de simultaneidade ("concurrency").
 * - Callbacks opcionais podem ser providenciados para lidar com tarefas finalizadas ou em caso de erro.
 *
 * @example
 * ```typescript
 * const queue = new TaskQueue<string>({
 *   concurrency: 2,
 *   onTaskCompleted: (resultado) => console.log(`Tarefa concluída com o resultado: ${resultado}`),
 *   onTaskFailed: (erro) => console.error(`Tarefa falhou com o erro: ${erro}`),
 * });
 *
 * queue.add(async () => {
 *   await new Promise((resolve) => setTimeout(resolve, 1000));
 *   return "Task 1";
 * });
 *
 * queue.add(async () => {
 *   await new Promise((resolve) => setTimeout(resolve, 500));
 *   return "Task 2";
 * });
 *
 * queue.completion().then(() => console.log("Todas as tarefas foram finalizadas!."));
 * ```
 */
class TaskQueue<T> {
	private readonly queue: Array<() => Promise<T>> = [];
	private readonly running: Array<Promise<void>> = [];
	private readonly concurrency: number;
	private readonly onTaskCompleted?: (result: T) => void;
	private readonly onTaskFailed?: (error: unknown) => void;

	constructor(options: TaskQueueOptions<T>) {
		this.concurrency = options.concurrency;
		this.onTaskCompleted = options.onTaskCompleted;
		this.onTaskFailed = options.onTaskFailed;
	}

	/**
	 * Executa uma tarefa assíncrona e trata sua conclusão, falha, e tarefas subsequentes na fila.
	 *
	 * @param task - Uma função que retorna uma promessa atribuida a um valor de tipo genérico "T".
	 * @returns Uma promessa que é resolvida quando a "task" e quaisquer "tasks" subsequentes na fila são completadas.
	 *
	 * @remarks
	 * - Se a "task" finalizar com sucesso, a callback "onTaskCompleted" é chamada com o resultado.
	 * - Se a "task" falhar, a callback "onTaskFailed" é chamada com o erro, se definido.
	 * - Depois da "task" ser processada, a próxima "task" na fila (se houver) é executada recursivamente.
	 */
	private async run(task: () => Promise<T>) {
		try {
			const data = await task();

			if (this.onTaskCompleted) {
				this.onTaskCompleted(data);
			}
		} catch (err) {
			if (this.onTaskFailed) {
				this.onTaskFailed(err);
			} else {
				throw err;
			}
		} finally {
			if (this.queue.length > 0) {
				await this.run(this.queue.shift()!);
			}
		}
	}

	/**
	 * Adiciona uma "task" à fila de "tasks". Se o número de "tasks" atualmente em 
	 * execução for menor do que o permitido pelo valor de simultaneidade (concurrency),
	 * a "task" é executada imediatamente. Caso contrário, a "task" é adicionada à fila para ser executada depois.
	 *
	 * @param task - Uma função que retorna uma promessa de tipo genérico "T", representando a "task" assíncrona a ser executada.
	 */
	public add(task: () => Promise<T>) {
		if (this.running.length < this.concurrency) {
			this.running.push(this.run(task));
		} else {
			this.queue.push(task);
		}
	}

	/**
	 * Espera para que todas as "tasks" atualmente sendo executadas finalizarem.
	 *
	 * @returns Uma promessa que é finalizada quando todas as "tasks" na fila de nome "running" terminam de executar.
	 */
	public completion() {
		return Promise.all(this.running);
	}
}

export default TaskQueue;
