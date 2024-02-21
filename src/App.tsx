import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className="min-h-screen bg-slate-900 text-primary-foreground">
			<h2 className="pt-6 text-xl font-black text-center">
				Global States with Redux vs Zustand.
			</h2>
			<Outlet />
		</div>
	);
}

export default App;
