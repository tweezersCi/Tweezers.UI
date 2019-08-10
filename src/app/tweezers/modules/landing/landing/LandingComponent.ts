import { Component } from '@angular/core';
import { BaseComponent } from '../../base-component/BaseComponent';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/tweezers/utils/authentication-service';
import { SnackBarDefinition } from '../../infra/snack-bar/SnackBarDefinition';
import { MatSnackBar } from '@angular/material';
import { TweezersSnackBarComponent } from '../../infra/snack-bar/TweezersSnackBarComponent';
import { TweezersSnackbarService } from '../../infra/snack-bar/TweezersSnackbarService';

@Component({
    selector: 'landing',
    templateUrl: "landing.component.html"
})
export class LandingComponent extends BaseComponent {
    routerEventsSubscription: Subscription;
    
    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title, protected authService: AuthenticationService, protected snackbarService: TweezersSnackbarService) {
        super(tweezCache, tweezApi, router, titleModule, authService);
        this.routerEventsSubscription = this.router.events.subscribe(ev => {
            if (ev instanceof NavigationEnd) {
                this.titleModule.setTitle("Landing - Tweezers");
            }
        });
    }

    ngOnInit(): void {
    }

    successSnackBar: SnackBarDefinition = {
        message: "Updated",
        icon: "done",
        type: "success"
    }

    ngOnDestroy(): void {
        this.routerEventsSubscription.unsubscribe();
    }
}