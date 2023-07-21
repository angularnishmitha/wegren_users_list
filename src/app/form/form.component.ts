import {
    Component,
    OnInit
} from '@angular/core';
import {
    MatDialog
} from '@angular/material/dialog';
import {
    Observable
} from 'rxjs';
import {
    IUser
} from '../interfaces/user.interface';
import {
    select,
    Store
} from '@ngrx/store';
import * as fromUsers from '../store/user/index';
import {
    DialogComponent
} from '../dialog.component';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';
import {
    MatButtonModule
} from '@angular/material/button';
import {
    HttpClient,
    HttpClientModule
} from '@angular/common/http';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {
    fileName = '';
    users$: Observable < IUser[] > |undefined;
    isLoading$: Observable < boolean > |undefined ;

    constructor(private readonly store: Store, private dialog: MatDialog, private http: HttpClient) {}

    ngOnInit(): void {
        this.initDispatch();
        this.initSubscriptions();
    }

    onCreateUser(firstname: string, lastname: string, email: string, mobile: string, profilepicture: string): void {
        this.dialog.closeAll()

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
        this.store.dispatch(fromUsers.updateUser({
            user
        }));
    }

    onDeleteUser(user: IUser): void {
        this.store.dispatch(fromUsers.deleteUser({
            user
        }));
    }

    private initDispatch(): void {
        this.store.dispatch(fromUsers.getUsers());
    }

    private initSubscriptions(): void {
        this.users$ = this.store.pipe(select(fromUsers.selectUsersList));
        this.isLoading$ = this.store.pipe(select(fromUsers.selectUserIsLoading));
    }

    openModal() {
        const dialogRef = this.dialog.open(FormComponent, {
            height: '500px',
            width: '800px'
        });
    }

    closeModal() {
        //this.dialog.close();
        // this.dialogRef.afterClosed().subscribe(result => {
        //   this.result = result;
        // });
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("thumbnail", file);
            const upload$ = this.http.post("/api/thumbnail-upload", formData);
            upload$.subscribe();
        }
    }
}