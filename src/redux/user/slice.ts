import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
	name: string | null;
}

const initialState: UserState = {
	name: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<UserState>) => {
			state.name = action.payload.name;
		},
	},
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
