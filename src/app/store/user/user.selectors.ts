import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUserState } from './user.model';

export const selectUserState = createFeatureSelector<IUserState>('user');
export const selectUsersList = createSelector(selectUserState, (state) => state.users);
export const selectUserIsLoading = createSelector(selectUserState, (state) => state.isLoading);
