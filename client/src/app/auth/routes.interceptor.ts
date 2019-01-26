import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoutesInterceptor implements CanActivate, CanActivateChild {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.validatorAuthenticated();
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.validatorAuthenticated();
    }
    validatorAuthenticated(): boolean {
        if (this.auth.getToken()) {
            return true;
        } else {
            this.router.navigate(['./login']);
            return false;
        }
    }
}
