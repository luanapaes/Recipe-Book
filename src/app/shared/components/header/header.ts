import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsgSnackBarService } from '../../services/msg-snackbar.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  router = inject(Router);
  msgSnackBar = inject(MsgSnackBarService)

  logout() {
    localStorage.clear()
    this.msgSnackBar.openSnackBar("Saindo..")
    setTimeout(() => {
      this.router.navigate([''])
    }, 500)
  }
}
