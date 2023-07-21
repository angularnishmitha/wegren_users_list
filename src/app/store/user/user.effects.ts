import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as fromUsers from './index';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions, private readonly userService: UserService) {
    }

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsers.getUsers.type),
            switchMap(() => this.userService.getUsers()),
            map((users: IUser[]) => fromUsers.getUsersSuccess({users}))
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsers.createUser),
            switchMap(({user}) => this.userService.create(user)),
            map((user: IUser) => fromUsers.createUserSuccess({user}))
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsers.updateUser),
            switchMap(({user}) => this.userService.update(user)),
            map((user: IUser) => fromUsers.updateUserSuccess({user}))
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsers.deleteUser),
            switchMap(({user}) => this.userService.delete(user)),
            map((user: IUser) => fromUsers.deleteUserSuccess({user}))
        )
    );
}
