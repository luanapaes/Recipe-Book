import { Component, inject, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-msg-snackbar',
  imports: [],
  templateUrl: './msg-snackbar.html',
  styleUrl: './msg-snackbar.css'
})
export class MsgSnackbar {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public mensagem: string) { }
}
