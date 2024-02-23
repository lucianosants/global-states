import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TodoState = {
	name: string | null;
	tasks: {
		id?: string;
		content: string;
		status: 'pending' | 'done';
	}[];
};

const initialState: TodoState = {
	name: null,
	tasks: [],
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<Omit<TodoState, 'tasks'>>) => {
			state.name = action.payload.name;
		},
		addTask: (state, action: PayloadAction<Omit<TodoState, 'name'>>) => {
			const isAlready = state.tasks.some(
				(task) => task.content === action.payload.tasks[0].content
			);

			if (isAlready) return;

			state.tasks.push({
				...action.payload.tasks[0],
				id: nanoid(),
			});
		},
		checkTask: (
			state,
			action: PayloadAction<{ id: string; status: 'done' | 'pending' }>
		) => {
			const task = state.tasks.find(
				(task) => task.id === action.payload.id
			);

			if (task?.status === 'done') {
				task.status = 'pending';
				return;
			}

			task!.status = 'done';
		},
	},
});

export const selectTodo = (state: RootState) => state.todo;

export const { setName, addTask, checkTask } = todoSlice.actions;

export default todoSlice.reducer;
