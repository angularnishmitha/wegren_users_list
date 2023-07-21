import { Component, OnInit } from '@angular/core';
import { Observable, last } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { select, Store } from '@ngrx/store';
import * as fromUsers from './store/user/index';
import { DialogComponent } from './dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    users$: Observable<IUser[]> |undefined;
    isLoading$: Observable<boolean> |undefined;
 
    constructor(private readonly store: Store,private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.initDispatch();
        this.initSubscriptions();
    }

    onCreateUser(firstname: string,lastname:string,email:string,mobile:string,profilepicture: string): void {
        console.log(firstname,lastname,email,mobile,profilepicture);
        if (!firstname) {
            return;
        }

        this.store.dispatch(fromUsers.createUser({
            user: {
                 id: Math.random(),
                firstname,
                lastname,
	            email,
	            mobile,
	            profilepicture
            }
        }));
    }

    onUpdateUser(user: IUser): void {
        this.store.dispatch(fromUsers.updateUser({user}));
    }

    onDeleteUser(user: IUser): void {
        console.log(user)
        this.store.dispatch(fromUsers.deleteUser({user}));
    }

    private initDispatch(): void {
        this.store.dispatch(fromUsers.getUsers());
    }

    private initSubscriptions(): void {
        this.users$ = this.store.pipe(select(fromUsers.selectUsersList));
        console.log(this.users$)
        this.isLoading$ = this.store.pipe(select(fromUsers.selectUserIsLoading));
    }

    openModal(){
        const dialogRef = this.dialog.open(FormComponent, {
            height: '700px',
            width:'800px'
        });
    }

}
