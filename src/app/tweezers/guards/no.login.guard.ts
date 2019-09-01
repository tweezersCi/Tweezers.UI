import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TweezersApi } from "../utils/tweezers-api";

@Injectable({
    providedIn: "root"
})
export class NoLoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem("sessionId")) {
            // this.router.navigate([''], {});
            return false;
        }

        return true;
    }
}
