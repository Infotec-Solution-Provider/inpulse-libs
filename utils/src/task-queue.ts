interface TaskQueueOptions<T> {
	concurrency: number;
	onTaskCompleted?: (result: T) => void;
	onTaskFailed?: (error: unknown) => void;
}

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

	public add(task: () => Promise<T>) {
		if (this.running.length < this.concurrency) {
			this.running.push(this.run(task));
		} else {
			this.queue.push(task);
		}
	}

	public completion() {
		return Promise.all(this.running);
	}
}

export default TaskQueue;
