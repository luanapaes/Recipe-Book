import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  router = inject(Router)
  constructor(
    private authService: AuthService
  ) { }

  canActivate() {
    if(this.authService.logado()){
      return true
    } else {
      this.router.navigate(['home']);
      return false
    }
  }
}