import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
//import { Utilisateur } from 'app/utilisateur/utilisateur';

@Injectable()
export class AuthGuard implements CanActivate{
  //  currentUser: Utilisateur;
    constructor(private router: Router) {
     //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}