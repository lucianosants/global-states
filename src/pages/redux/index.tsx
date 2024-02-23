import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Login } from '@/components/login';
import { ResumeCard } from '@/components/resume-card';

import { useTodo } from '@/hooks/use-todo.hook';

import { useSelector } from 'react-redux';
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
		return (
			<section className="container min-h-screen pt-6 bg-slate-100 text-primary">
				<h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
					Welcome to{' '}
					<span className="text-purple-500">Redux Tasks</span>.
				</h2>

				<div className="mt-6">
					<Login />
				</div>
			</section>
		);
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
							<ResumeCard
								title={todo.name}
								completed={completedTasks}
								total={totalTasks}
							/>

							<Card className="mt-2 bg-purple-400 w-fit">
								<CardContent>
									<div className="mt-6">
										<form
											onSubmit={handleAddTask}
											className="flex items-center w-full max-w-sm space-x-2"
										>
											<Input
												type="text"
												placeholder="Enter a task"
												className="bg-purple-300 border-purple-800 placeholder:text-slate-800"
												onChange={(event) =>
													setContent(
														event.target.value
													)
												}
												value={content}
											/>
											<Button
												type="submit"
												disabled={!content}
											>
												Add task
											</Button>
										</form>
									</div>

									<div className="flex flex-col gap-4 mt-4">
										{!todo.tasks.length && (
											<p className="text-xl font-bold">
												There are no tasks yet
											</p>
										)}

										{todo.tasks.map((task) => (
											<div
												key={task.id}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={task.id}
													checked={
														task.status === 'done'
													}
													onClick={() =>
														dispatch(
															checkTask({
																id: task.id!,
																status: 'done',
															})
														)
													}
												/>
												<label
													htmlFor={task.id}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{task.content}
												</label>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
