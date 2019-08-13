import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate{

  constructor(
    private authservice: AuthenticationService,
    private router: Router
    ) { }

  canActivate(): boolean {
    if(this.authservice.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/welcome']);
    }
  }
}
