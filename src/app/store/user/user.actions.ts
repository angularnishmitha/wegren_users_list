import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';
const prefix = '[Users]';

export const getUsers = createAction(`${prefix} Get Users`);
export const getUsersSuccess = createAction(
    `${getUsers.type} Success`,
    props<{
        users: IUser[];
    }>()
);

export const createUser = createAction(
    `${prefix} Create User`,
    props<{
        user: IUser;
    }>()
);

export const createUserSuccess = createAction(
    `${createUser.type} Success`,
    props<{
        user: IUser;
    }>()
);

export const updateUser = createAction(
    `${prefix} Update User`,
    props<{
        user: IUser;
    }>()
);

export const updateUserSuccess = createAction(
    `${updateUser.type} Success`,
    props<{
        user: IUser;
    }>()
);

export const deleteUser = createAction(
    `${prefix} Delete User`,
    props<{
        user: IUser;
    }>()
);
export const deleteUserSuccess = createAction(
    `${deleteUser.type} Success`,
    props<{
        user: IUser;
    }>()
);
