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

import { useTodo } from '@/hooks/use-todo.hook';

import { checkTask } from '@/redux/todo/slice';
import { selectUser } from '@/redux/user/slice';

export function ReduxPage() {
	const {
		todo,
		listName,
		setListName,
		content,
		setContent,
		dispatch,
		totalTasks,
		handleAddTask,
		completedTasks,
		handleEnterList,
	} = useTodo();

	const user = useSelector(selectUser);

	if (!user.name) {
		return <Hero titlePage="Redux" />;
	}

	return (
		<section className="container min-h-screen pt-6 bg-slate-100 text-primary">
			<h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
				Welcome to <span className="text-purple-500">Redux Tasks</span>.
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

				{!todo.name ? (
					<div>
						<div className="mt-6">
							<form
								onSubmit={handleEnterList}
								className="flex items-center w-full max-w-sm space-x-2"
							>
								<Input
									type="text"
									placeholder="Enter your list name"
									value={listName}
									onChange={(event) =>
										setListName(event.target.value)
									}
								/>
								<Button type="submit" disabled={!listName}>
									Submit
								</Button>
							</form>
						</div>
					</div>
				) : (
					<>
						<div className="flex flex-col gap-4 md:flex-row">
							<TasksCardRoot
								count={totalTasks}
								isCompleted={completedTasks}
								listName={todo.name}
							>
								<TasksCardInput
									content={content}
									setContent={setContent}
									handleAddTask={handleAddTask}
								/>
								<TasksCardList
									tasks={todo.tasks}
									checkTask={(id) =>
										dispatch(checkTask({ id }))
									}
								/>
							</TasksCardRoot>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
