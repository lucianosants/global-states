import { FormEvent, ReactNode, SetStateAction } from 'react';

import { ResumeCard } from '../resume-card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

import { type TodoState } from '@/redux/todo/slice';

export type ThemeVariantProps = 'emerald' | 'purple';

type TasksCardRootProps = {
	listName: string;
	count: number;
	isCompleted: number;
	children: ReactNode;
	theme?: ThemeVariantProps;
};

export function TasksCardRoot(props: TasksCardRootProps) {
	const { listName, isCompleted, count, children, theme = 'purple' } = props;

	return (
		<div>
			<div className="flex flex-col gap-4 md:flex-row">
				<ResumeCard
					title={listName}
					total={count}
					completed={isCompleted}
				/>

				<Card className={`mt-2 bg-${theme}-400 w-fit`}>
					<CardContent>{children}</CardContent>
				</Card>
			</div>
		</div>
	);
}

type TasksCardInputProps = {
	handleAddTask: (event: FormEvent<HTMLFormElement>) => void;
	content: string;
	setContent: (value: SetStateAction<string>) => void;
	theme?: ThemeVariantProps;
};

export function TasksCardInput(props: TasksCardInputProps) {
	const { handleAddTask, content, setContent, theme = 'purple' } = props;

	return (
		<div className="mt-6">
			<form
				onSubmit={handleAddTask}
				className="flex items-center w-full max-w-sm space-x-2"
			>
				<Input
					type="text"
					placeholder="Enter a task"
					className={`bg-${theme}-300 border-${theme}-800 placeholder:text-slate-800`}
					onChange={(event) => setContent(event.target.value)}
					value={content}
				/>
				<Button type="submit" disabled={!content}>
					Add task
				</Button>
			</form>
		</div>
	);
}

type TasksCardListProps = {
	tasks: TodoState['tasks'];
	checkTask: (TaskId: string) => void;
};

export function TasksCardList(props: TasksCardListProps) {
	const { tasks, checkTask } = props;

	return (
		<div className="flex flex-col gap-4 mt-4">
			{!tasks.length && (
				<p className="text-xl font-bold">There are no tasks yet</p>
			)}

			{tasks.map((task) => (
				<div key={task.id} className="flex items-center space-x-2">
					<Checkbox
						id={task.id}
						checked={task.status === 'done'}
						onClick={() => checkTask(task.id!)}
					/>
					<label
						htmlFor={task.id}
						className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
							task.status === 'done' && 'line-through opacity-80'
						}`}
					>
						{task.content}
					</label>
				</div>
			))}
		</div>
	);
}
