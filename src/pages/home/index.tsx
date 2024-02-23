import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Login } from '@/components/login';

import { selectUser } from '@/redux/user/slice';

export function Home() {
	const user = useSelector(selectUser);

	return (
		<section className="min-h-screen bg-slate-100 text-primary">
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
							<Button asChild>
								<Link to={'/redux'}>Redux</Link>
							</Button>
							<Button asChild>
								<Link to={'/zustand'}>Zustand</Link>
							</Button>
						</div>
					</div>
				) : (
					<Login />
				)}
			</div>
		</section>
	);
}
