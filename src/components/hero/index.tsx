import { Login } from '../login';
import { type ThemeVariantProps } from '../tasks-card';

type HeroProps = {
	titlePage: 'Zustand' | 'Redux';
	theme?: ThemeVariantProps;
};

export function Hero(props: HeroProps) {
	const { titlePage, theme = 'purple' } = props;

	return (
		<section className="container min-h-screen pt-6 bg-slate-100 text-primary">
			<h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
				Welcome to{' '}
				<span className={`text-${theme}-500`}>{titlePage} Tasks</span>.
			</h2>

			<div className="mt-6">
				<Login />
			</div>
		</section>
	);
}
