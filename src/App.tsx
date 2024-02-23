import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className="min-h-screen bg-slate-200 text-primary">
			<header className="container flex items-center justify-center h-full py-4">
				<h2 className="text-xl font-black text-center">
					Global States
				</h2>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default App;
