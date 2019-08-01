import { Component } from '@angular/core';
import { BaseComponent } from '../../base-component/BaseComponent';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/tweezers/utils/authentication-service';

@Component({
    selector: 'landing',
    templateUrl: "landing.component.html"
})
export class LandingComponent extends BaseComponent {
    routerEventsSubscription: Subscription;
    
    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title, protected authService: AuthenticationService) {
        super(tweezCache, tweezApi, router, titleModule, authService);
        this.routerEventsSubscription = this.router.events.subscribe(ev => {
            if (ev instanceof NavigationEnd) {
                this.titleModule.setTitle("Landing - Tweezers");
            }
        });
        
    }


    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.routerEventsSubscription.unsubscribe();
    }
}