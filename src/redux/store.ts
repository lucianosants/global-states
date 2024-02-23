import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import todoReducer from './todo/slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		todo: todoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
