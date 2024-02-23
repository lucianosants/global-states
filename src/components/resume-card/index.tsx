import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export type ResumeCardProps = {
	title: string;
	total: number;
	completed: number;
};

export function ResumeCard(props: ResumeCardProps) {
	const { title, total, completed } = props;

	return (
		<div>
			<Card className="mt-2 md:w-fit h-fit">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>

				<CardContent>
					<div>
						<p>Total</p>
						<p className="text-xl font-semibold">{total}</p>
					</div>

					<div className="mt-4">
						<p>Completed</p>
						<p className="text-xl font-semibold">{completed}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
