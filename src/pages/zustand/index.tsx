import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	TasksCardRoot,
	TasksCardInput,
	TasksCardList,
} from '@/components/tasks-card';
import { Hero } from '@/components/hero';

import { selectUser } from '@/redux/user/slice';
import { useTodoStore } from '@/zustand/todo/store';

export function ZustandPage() {
	const [newListName, setNewListName] = useState('');
	const [content, setContent] = useState('');

	const user = useSelector(selectUser);

	const listName = useTodoStore((state) => state.name);
	const setName = useTodoStore((state) => state.setName);
	const tasks = useTodoStore((state) => state.tasks);
	const addTask = useTodoStore((state) => state.addTask);
	const checkTask = useTodoStore((state) => state.checkTask);

	const [count, isCompleted] = [
		tasks.length,
		tasks.filter(({ status }) => status === 'done').length,
	];

	const handleEnterList = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setName(newListName);
	};

	const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addTask([{ content, status: 'pending', id: Math.random().toString() }]);
		setContent('');
	};

	if (!user.name) {
		return <Hero titlePage="Zustand" theme="emerald" />;
	}

	return (
		<section className="container min-h-screen pt-6 bg-slate-100 text-primary">
			<h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
				Welcome to{' '}
				<span className="text-emerald-500">Zustand Tasks</span>.
			</h2>

			<div className="mt-6">
				<div className="flex items-center gap-2">
					<Button asChild size={'icon'} variant={'outline'}>
						<Link to="/">
							<ChevronLeft />
						</Link>
					</Button>
					<h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
						{user.name?.concat(`'s tasks`)}
					</h3>
				</div>

				{!listName ? (
					<div>
						<div className="mt-6">
							<form
								onSubmit={handleEnterList}
								className="flex items-center w-full max-w-sm space-x-2"
							>
								<Input
									type="text"
									placeholder="Enter your list name"
									value={newListName}
									onChange={(event) =>
										setNewListName(event.target.value)
									}
								/>
								<Button type="submit" disabled={!newListName}>
									Submit
								</Button>
							</form>
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-4 md:flex-row">
						<TasksCardRoot
							count={count}
							isCompleted={isCompleted}
							listName={listName}
							variant="emerald"
						>
							<TasksCardInput
								content={content}
								setContent={setContent}
								handleAddTask={handleAddTask}
								variant="emerald"
							/>
							<TasksCardList
								tasks={tasks}
								checkTask={checkTask}
							/>
						</TasksCardRoot>
					</div>
				)}
			</div>
		</section>
	);
}
