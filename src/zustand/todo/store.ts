import { TodoState } from '@/redux/todo/slice';
import { create } from 'zustand';

type State = TodoState;

type Actions = {
	setName: (name: string) => void;
	addTask: (task: Partial<TodoState['tasks']>) => void;
	checkTask: (taskId: string) => void;
};

export const useTodoStore = create<State & Actions>((set) => ({
	name: null,
	tasks: [],
	setName: (name) => set(() => ({ name: name })),
	addTask: (task) =>
		set((state) => {
			const newTask = task[0]!;

			const taskIsAlready = state.tasks.some(
				(task) => task.content === newTask.content
			);

			if (taskIsAlready) {
				alert('Task is already');
				return state;
			}

			return {
				tasks: [...state.tasks, newTask],
			};
		}),
	checkTask: (taskId) =>
		set((state) => {
			const task = state.tasks.find((task) => task.id === taskId)!;

			if (task?.status === 'done') {
				task.status = 'pending';
				return {
					tasks: state.tasks.map((task) => task),
				};
			}

			task!.status = 'done';
			return {
				tasks: state.tasks.map((task) => task),
			};
		}),
}));
