import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Home() {
	return (
		<div className="min-h-screen bg-slate-900 text-primary-foreground">
			<div className="flex flex-col items-center pt-16">
				<h2 className="text-xl font-black">
					Global States with Redux vs Zustand.
				</h2>

				<div className="flex gap-4 mt-8">
					<Button asChild variant={'secondary'}>
						<Link to={'/redux'}>Redux</Link>
					</Button>

					<Button asChild variant={'secondary'}>
						<Link to={'/zustand'}>Zustand</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
