import { inject, Injectable } from '@angular/core';
import { MsgSnackbar } from '../msg-snackbar/msg-snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MsgSnackBarService {
    private _snackBar = inject(MatSnackBar);

    openSnackBar(mensagem: string) {
        this._snackBar.openFromComponent(MsgSnackbar, {
            duration: 1000,
            data: mensagem
        });
    }
}
