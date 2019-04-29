import { Component } from "@angular/core";
import { BaseComponent } from '../../base-component/BaseComponent';

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

    ngOnInit(): void {
        this.tweezCache.getClassMetadata().then(res => {
            this.linkData = res;
            this.linkData.unshift(landingLinkData);
            window.linkData = this.linkData;
        });
    }

    ngAfterContentInit(): void {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
    }
}