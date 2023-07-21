import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef <DialogComponent> , private formBuilder: FormBuilder) {
  }
}