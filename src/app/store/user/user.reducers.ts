import { Action, createReducer, on } from '@ngrx/store';

import { IUserState } from './user.model';
import * as fromUsers from './index';
import { Actions } from '@ngrx/effects';

export const initialUserState: IUserState = {
    users: [],
    isLoading: false
};

const reducer = createReducer<IUserState>(
    initialUserState,
    on(fromUsers.getUsers, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromUsers.getUsersSuccess, (state, { users }) => {
        return {
            ...state,
            isLoading: false,
            users
        };
    }),
    on(fromUsers.createUser, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromUsers.createUserSuccess, (state, { user }) => {
        return {
            ...state,
            users: [...state.users, user],
            isLoading: false,
        };
    }),
    on(fromUsers.updateUser, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromUsers.updateUserSuccess, (state, { user }) => {
        return {
            ...state,
            users: state.users.map((b) => b.id ===  user.id ? user : b),
            isLoading: false,
        };
    }),
    on(fromUsers.deleteUser, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromUsers.deleteUserSuccess, (state, { user }) => {
        return {
            ...state,
            isLoading: false,
            users: state.users.filter((b) => b.id !== user.id)
        };
    })
);

export function userReducer(state = initialUserState, actions: Action): IUserState {
    return reducer(state, actions);
}
