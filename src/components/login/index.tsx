import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { login } from '@/redux/user/slice';

export function Login() {
	const [name, setName] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(login({ name }));
	};

	return (
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
			<Button type="submit" disabled={name.length ? false : true}>
				Submit
			</Button>
		</form>
	);
}
