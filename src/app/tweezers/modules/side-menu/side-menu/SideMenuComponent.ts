import { Component, ViewChildren, ViewChild } from "@angular/core";
import { ClassBaseMetadata } from 'src/app/tweezers/interfaces/class-base-metadata';
import { BaseComponent } from '../../base-component/BaseComponent';
import { MatList, MatListItem } from '@angular/material';
import { TweezersColorPicker } from 'src/app/tweezers/utils/tweezers-color-picker';

declare let window;

const landingLinkData: ClassBaseMetadata = {
    name: "menu",
    displayName: "Menu",
    description: "",
    referenceLink: "",
    iconName: "home"
}

@Component({
    selector: 'tweezers-side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.css'],
})
export class SideMenuComponent extends BaseComponent {
    
    private linkData: ClassBaseMetadata[];

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