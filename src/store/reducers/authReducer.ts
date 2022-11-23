import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi, AuthUserType, LoginValueType, RegistrationValueType} from '../../api/authApi';
import {setUsers} from './usersReducer';

export type AuthReducerStateType = {
    isAuth: boolean
    user: AuthUserType
}

export const AuthReducerInitialState: AuthReducerStateType = {
    isAuth: false,
    user: {} as AuthUserType
}

export const registrationThunk = createAsyncThunk('registration', async (arg: RegistrationValueType, thunkAPI) => {
    try {
        const user = await authApi.registration(arg);
        thunkAPI.dispatch(loginAction(user.data));
    } catch (e) {
        alert(e);
        throw e;
    }
});

export const loginThunk = createAsyncThunk('login', async (arg: LoginValueType, thunkAPI) => {
    try {
        const user = await authApi.login(arg);
        thunkAPI.dispatch(loginAction(user.data));
    } catch (e) {
        alert(e);
        throw e;
    }
});

export const logoutThunk = createAsyncThunk('logout', async (arg: { id: number }, thunkAPI) => {
    try {
        await authApi.logout(arg.id);
        thunkAPI.dispatch(setUsers([]));
        thunkAPI.dispatch(logoutAction());
    } catch (e) {
        alert(e);
        throw e;
    }
});

export const authReducer = createSlice({
    name: 'auth',
    initialState: AuthReducerInitialState,
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload
            state.isAuth = true;
        },
        logoutAction: (state) => {
            state.isAuth = false;
            state.user = {} as AuthUserType;
        }
    }
});

export const {loginAction, logoutAction} = authReducer.actions;

export default authReducer.reducer;