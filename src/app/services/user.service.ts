import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private usersList: IUser[] = [
        {
             id: Math.random(),
            firstname: 'Anjali',
            lastname : 'Shetty',
	        email : 'anjali@wegren.com',
	        mobile : '7838464512',
	        profilepicture: ''

        },
        {
             id: Math.random(),
            firstname: 'Suhas',
            lastname : 'Naidu',
	        email : 'suhas@wegren.com',
	        mobile : '9838464512',
	        profilepicture: ''
        },
        {
            id: Math.random(),
           firstname: 'Riya',
           lastname : 'Chauhan',
           email : 'riya@wegren.com',
           mobile : '9008464517',
           profilepicture: '../path/pic.png'
       }
    ];

    constructor() {
    }

    getUsers(): Observable<IUser[]> {
        return of(this.usersList);
    }

    create(user: IUser): Observable<IUser> {
        console.log(user)
        this.usersList = [
            ...this.usersList,
            user
        ];

        return of(user);
    }
    update(updateUser: IUser): Observable<IUser> {
        this.usersList.map(user => user.id === updateUser.id ? updateUser : user);
        return  of(updateUser);
    }

    delete(user: IUser): Observable<IUser> {
        this.usersList = this.usersList.filter(b => b.id !== user.id);
        return of(user);
    }
}
