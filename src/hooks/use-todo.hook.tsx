import { addTask, selectTodo, setName } from '@/redux/todo/slice';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useTodo() {
	const [listName, setListName] = useState('');
	const [content, setContent] = useState('');

	const todo = useSelector(selectTodo);
	const dispatch = useDispatch();

	const handleEnterList = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(setName({ name: listName }));
	};

	const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(addTask({ tasks: [{ content, status: 'pending' }] }));
		setContent('');
	};

	const totalTasks = todo.tasks.length;

	const completedTasks = todo.tasks.filter(
		(task) => task.status === 'done'
	).length;

	return {
		listName,
		setListName,
		content,
		setContent,
		todo,
		handleEnterList,
		handleAddTask,
		totalTasks,
		completedTasks,
		dispatch,
	};
}
