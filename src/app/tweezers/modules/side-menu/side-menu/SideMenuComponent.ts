import { Component, Output } from "@angular/core";
import { BaseComponent } from '../../base-component/BaseComponent';
import { AuthenticationService } from 'src/app/tweezers/utils/authentication-service';
import { Router } from '@angular/router';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Title } from '@angular/platform-browser';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { SideMenuUpdateService } from 'src/app/tweezers/utils/side-menu-update-service';

declare let window;

const landingLinkData: any = {
    collectionName: "menu",
    displayNames: {
        pluralName: "Menu",
    },
    referenceLink: "",
    icon: "home"
}

@Component({
    selector: 'tweezers-side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.css'],
})
export class SideMenuComponent extends BaseComponent {

    private linkData: any;
    private internalLinkData: any;

    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title, protected authService: AuthenticationService, protected sideMenuUpdateService: SideMenuUpdateService) {
        super(tweezCache, tweezApi, router, titleModule, authService);
    }

    ngOnInit(): void {
        this.updateSideMenu();
        this.sideMenuUpdateService.updateEvent.addListener("update", this.updateSideMenu.bind(this));
    }

    ngAfterContentInit(): void {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
    }

    updateSideMenu(): void {
        console.log("updating side menu...");
        this.tweezCache.getClassMetadata(true).then(res => {
            this.linkData = res.filter(obj => !obj.internal);
            this.internalLinkData = res.filter(obj => obj.internal);
            this.linkData.unshift(landingLinkData);
            window.linkData = this.linkData;
        });
    }
}