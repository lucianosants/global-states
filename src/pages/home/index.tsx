import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { RootState } from '@/redux/store';
import { login } from '@/redux/user/slice';

export function Home() {
	const [name, setName] = useState('');

	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(login({ name }));
	};

	return (
		<div className="min-h-screen bg-slate-900 text-primary-foreground">
			<div className="flex flex-col items-center pt-16">
				{user.name ? (
					<div className="">
						<h2 className="pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0">
							Welcome{' '}
							<span className="text-fuchsia-500">
								{user.name}
							</span>
							!
						</h2>

						<p>See your tasks in the links below</p>

						<div className="flex gap-4 mt-8">
							<Button asChild variant={'secondary'}>
								<Link to={'/redux'}>Redux</Link>
							</Button>
							<Button asChild variant={'secondary'}>
								<Link to={'/zustand'}>Zustand</Link>
							</Button>
						</div>
					</div>
				) : (
					<form
						className="container flex flex-col w-full gap-2 max-w-96"
						onSubmit={handleSubmit}
						autoComplete="off"
					>
						<p className="mb-2">Enter your name</p>

						<Input
							placeholder="ex.: John..."
							onChange={(event) => setName(event.target.value)}
						/>
						<Button type="submit" variant={'secondary'}>
							Submit
						</Button>
					</form>
				)}
			</div>
		</div>
	);
}
